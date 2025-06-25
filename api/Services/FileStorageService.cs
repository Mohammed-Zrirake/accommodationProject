using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using api.IServices;
using Microsoft.AspNetCore.Http;

namespace api.Services
{
    public class FileStorageService : IFileStorageService
    {
        private readonly IWebHostEnvironment webHost;
        private readonly string folderUploadPath;
        public FileStorageService(IWebHostEnvironment _webHost)
        {
            webHost = _webHost;
            folderUploadPath = Path.Combine(Directory.GetCurrentDirectory(),"images");
        }
        public async Task<string> SaveFileAsync(IFormFile file, string folder = "")
        {
            if (file == null || file.Length == 0)
        {
            // Or return null, or throw specific exception
            throw new ArgumentException("File is empty or null.", nameof(file));
        }
        if (file.Length >5*1024*1024 )
        {
            
            throw new ArgumentException("The maximum size of the file is 5MB");
        }
            string name = Guid.NewGuid().ToString();
            string[] valideExtension = [".jpg", ".jpeg", ".png", ".webp"];
            var extension = Path.GetExtension(file.FileName);
            if (!valideExtension.Contains(extension))
            {

                throw new ArgumentException("this extension is not supported", nameof(file));

            }
            var newFileName = $"{name}{extension}";
            string filePath = Path.Combine(folderUploadPath, newFileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return newFileName;
        }
        public async Task<List<string>> SaveAllFilesAsync(IFormFileCollection files, string subfolder = "")
        {
            if (files == null || !files.Any())
            {
                throw new ArgumentException("You should select images");
            }
            var savedFileName = new List<string>();
            foreach (var file in files)
            {
                string fileName = await SaveFileAsync(file);
                savedFileName.Add(fileName);
            }
            return savedFileName;
        }


        public Task DeleteFileAsync(string fileName)
        {
            if (string.IsNullOrEmpty(fileName))
            {
                return Task.CompletedTask;
            }

           

            var filePath = Path.Combine(folderUploadPath, fileName);

          
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }

            return Task.CompletedTask;
        }
        public async Task DeleteAllFilesAsync(List<string> fileNames)
        {
            if (fileNames == null || fileNames.Count == 0)
            {
                
                return;
            }

            foreach (var fileName in fileNames)
            {
                // Pass the subfolder to the single file delete method
                await DeleteFileAsync(fileName);
            }
        }
    }
}
   
    
