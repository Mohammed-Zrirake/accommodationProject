using System.Text;
using System.Text.Json;
using System.Net;
using api.Data;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Svix;

namespace api.Controllers;

[ApiController]
[Route("api/webhooks/clerk")]
public class ClerkWebhookController(
    IConfiguration configuration,
    ApplicationDbContext context,
    IHttpClientFactory httpClientFactory,
    ILogger<ClerkWebhookController> logger) : ControllerBase
{
    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Receive()
    {
        try
        {
            using var reader = new StreamReader(Request.Body, Encoding.UTF8);
            var payload = await reader.ReadToEndAsync();
            if (!IsValidSignature(payload)) return Unauthorized("Invalid Clerk webhook signature.");

            using var document = JsonDocument.Parse(payload);
            var root = document.RootElement;
            var eventType = root.GetProperty("type").GetString();
            logger.LogInformation("Received Clerk webhook event {EventType}.", eventType);
            if (eventType is not ("user.created" or "user.updated")) return Ok();

            var data = root.GetProperty("data");
            var userId = data.GetProperty("id").GetString();
            if (string.IsNullOrWhiteSpace(userId)) return BadRequest("Webhook user has no id.");
            var email = GetPrimaryEmail(data);
            if (string.IsNullOrWhiteSpace(email)) return BadRequest("Webhook user has no email.");
            var username = data.TryGetProperty("username", out var usernameValue) && !string.IsNullOrWhiteSpace(usernameValue.GetString())
                ? usernameValue.GetString()! : string.Join(' ', new[] { GetString(data, "first_name"), GetString(data, "last_name") }.Where(x => !string.IsNullOrWhiteSpace(x))).Trim();
            if (string.IsNullOrWhiteSpace(username)) username = email.Split('@')[0];
            var roleName = GetRole(data);
            var publicRole = GetMetadataRole(data, "public_metadata");

            var user = await context.Users.Include(u => u.UserRoles).FirstOrDefaultAsync(u => u.UserId == userId);
            if (user is null)
            {
                user = new User { UserId = userId, Username = username, Email = email };
                context.Users.Add(user);
            }
            else { user.Username = username; user.Email = email; }

            var role = await context.Roles.FirstAsync(r => r.RoleName == roleName);
            if (!user.UserRoles.Any(ur => ur.RoleId == role.RoleId))
            {
                context.UserRoles.RemoveRange(user.UserRoles);
                user.UserRoles.Add(new UserRole { UserId = userId, RoleId = role.RoleId });
            }
            await context.SaveChangesAsync();

            // Only update Clerk when the desired role is not already public. This avoids a user.updated loop.
            if (roleName is "owner" or "client" && publicRole != roleName)
                await SetClerkPublicRole(userId, roleName);

            return Ok();
        }
        catch (JsonException exception)
        {
            logger.LogWarning(exception, "Clerk webhook payload was not valid JSON.");
            return BadRequest("Invalid Clerk webhook payload.");
        }
        catch (Exception exception)
        {
            logger.LogError(exception, "Clerk webhook processing failed.");
            return StatusCode(StatusCodes.Status500InternalServerError, "Clerk webhook processing failed.");
        }
    }

    private bool IsValidSignature(string payload)
    {
        var secret = configuration["Clerk:WebhookSigningSecret"];
        if (string.IsNullOrWhiteSpace(secret))
        {
            logger.LogError("Clerk:WebhookSigningSecret is not configured.");
            return false;
        }

        var headers = new WebHeaderCollection
        {
            ["svix-id"] = Request.Headers["svix-id"].FirstOrDefault() ?? string.Empty,
            ["svix-timestamp"] = Request.Headers["svix-timestamp"].FirstOrDefault() ?? string.Empty,
            ["svix-signature"] = Request.Headers["svix-signature"].FirstOrDefault() ?? string.Empty
        };
        try
        {
            new Webhook(secret).Verify(payload, headers);
            return true;
        }
        catch (Exception exception)
        {
            logger.LogWarning(exception, "Clerk webhook signature verification failed.");
            return false;
        }
    }

    private static string GetRole(JsonElement data)
    {
        // Only owner/client are accepted from user-controlled unsafe metadata; admin is dashboard-only public metadata.
        var publicRole = GetMetadataRole(data, "public_metadata");
        if (publicRole == "admin") return "admin";
        return publicRole is "owner" or "client" ? publicRole : GetMetadataRole(data, "unsafe_metadata") is "owner" ? "owner" : "client";
    }
    private static string? GetMetadataRole(JsonElement data, string property) => data.TryGetProperty(property, out var metadata) && metadata.TryGetProperty("role", out var role) ? role.GetString()?.ToLowerInvariant() : null;
    private static string? GetString(JsonElement element, string property) => element.TryGetProperty(property, out var value) ? value.GetString() : null;
    private static string? GetPrimaryEmail(JsonElement data)
    {
        var primaryId = GetString(data, "primary_email_address_id");
        if (!data.TryGetProperty("email_addresses", out var emails)) return null;
        return emails.EnumerateArray().FirstOrDefault(e => GetString(e, "id") == primaryId).TryGetProperty("email_address", out var email) ? email.GetString() : null;
    }

    private async Task SetClerkPublicRole(string userId, string role)
    {
        var secretKey = configuration["Clerk:SecretKey"];
        if (string.IsNullOrWhiteSpace(secretKey)) throw new InvalidOperationException("Clerk:SecretKey must be configured to promote signup roles.");
        using var request = new HttpRequestMessage(HttpMethod.Patch, $"https://api.clerk.com/v1/users/{userId}/metadata")
        {
            Content = JsonContent.Create(new { public_metadata = new { role } })
        };
        request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", secretKey);
        var response = await httpClientFactory.CreateClient().SendAsync(request);
        response.EnsureSuccessStatusCode();
    }
}
