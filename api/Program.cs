using api.Data;
using api.IServices;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddControllers()
.AddNewtonsoftJson(options=>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IFileStorageService, FileStorageService>();
builder.Services.AddScoped<IDormServices, DormServices>();
builder.Services.AddScoped<IRoomServices, RoomServices>();
builder.Services.AddHttpClient();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = builder.Configuration["Clerk:Authority"];
        options.MapInboundClaims = false;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = false,
            NameClaimType = "sub",
            RoleClaimType = "role"
        };
    });
builder.Services.AddAuthorization();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlite(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        sqliteOptions => sqliteOptions.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery));
});
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "_myAllowSpecificOrigins",
                      policy => {
                          policy.AllowAnyOrigin()
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});
var app = builder.Build();

// The database stores application profiles only; Clerk remains the identity provider.
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    foreach (var roleName in new[] { "admin", "owner", "client" })
        if (!db.Roles.Any(r => r.RoleName == roleName)) db.Roles.Add(new Role { RoleName = roleName });
    db.SaveChanges();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    //app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}
else{
 app.UseHttpsRedirection();   
}
app.UseCors("_myAllowSpecificOrigins");
app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "images")),
    RequestPath = "/images"
});
app.UseExceptionHandler("/error");

app.Map("/error", (HttpContext context) =>
{
    var feature = context.Features.Get<IExceptionHandlerFeature>();
    var exception = feature?.Error;

    return Results.Problem(title: "An error occurred", detail: exception?.Message);
});

app.MapControllers();

app.Run();


