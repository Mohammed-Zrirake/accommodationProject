using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.IServices
{
    public interface IFileStorageService
    {
      
        Task<string>  SaveFileAsync(IFormFile file, string subfolder = "");
    Task<List<string>> SaveAllFilesAsync(IFormFileCollection files, string subfolder = "");
    }
}