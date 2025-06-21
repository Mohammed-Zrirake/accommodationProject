using api.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Riad
{
    

namespace api.Dtos.Riad
{
    public class CreateRiadRequestDto
    {
        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public Address Address { get; set; } = new Address();

        [Required]
        public string Description { get; set; } = string.Empty;

        public IFormFileCollection Photos { get; set; } = new FormFileCollection();

        // Riad-specific properties
        public bool HasCourtyard { get; set; }
        public bool TraditionalDecor { get; set; }
        public  List<Guid> AmenitiesIds { get; set; } = new List<Guid>();

        // The ID of the user creating the Riad
        [Required]
        public Guid ProviderId { get; set; }
    }
}
}