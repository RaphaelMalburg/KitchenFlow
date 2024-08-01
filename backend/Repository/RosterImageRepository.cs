using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public class RosterImageRepository : IRosterImageRepository
{
    private readonly BlobServiceClient _blobServiceClient;
    private readonly string _containerName = "usersroster";
    private readonly IConfiguration _config;


    public RosterImageRepository(IConfiguration config)
    {
        _config = config;
        _blobServiceClient = new BlobServiceClient(_config.GetSection("AzureBlob_ConnectionString").Value);
    }

    public async Task<RosterImageDTO> UploadImageAsync(IFormFile image, string userId)
    {
        var blobContainerClient = _blobServiceClient.GetBlobContainerClient(_containerName);
        await blobContainerClient.CreateIfNotExistsAsync();
        var blobClient = blobContainerClient.GetBlobClient($"{userId}/{image.FileName}");

        var metadata = new Dictionary<string, string>
        {
            { "UserId", userId }
        };

        await using (var stream = image.OpenReadStream())
        {
            var blobUploadOptions = new BlobUploadOptions
            {
                HttpHeaders = new BlobHttpHeaders { ContentType = image.ContentType },
                Metadata = metadata
            };

            await blobClient.UploadAsync(stream, blobUploadOptions);
        }

        return new RosterImageDTO
        {
            FileName = image.FileName,
            Url = blobClient.Uri.ToString(),
            UploadedAt = DateTime.UtcNow,
            UserId = userId
        };
    }

    public async Task<IEnumerable<RosterImageDTO>> GetAllImagesAsync(string userId)
    {
        var blobContainerClient = _blobServiceClient.GetBlobContainerClient(_containerName);
        var blobs = blobContainerClient.GetBlobsAsync();
        var blobClient = blobContainerClient.GetBlobClient($"{userId}");




        var images = new List<RosterImageDTO>();
        await foreach (var blob in blobs)
        {


          /*
            if (blob.Metadata.ContainsKey("UserId") && blob.Metadata["UserId"] == userId)
            {
                images.Add(new RosterImageDTO
                {
                    FileName = blob.Name,
                    Url = $"{blobContainerClient.Uri}/{blob.Name}",
                    UploadedAt = blob.Properties.CreatedOn?.UtcDateTime ?? DateTime.UtcNow,
                    UserId = userId
                });

            }
            */
            if(blob.Name.Contains(userId+"/"))
            {

                        images.Add(new RosterImageDTO
                {
                    FileName = blob.Name,
                    Url = $"{blobContainerClient.Uri}/{blob.Name}",
                    UploadedAt = blob.Properties.CreatedOn?.UtcDateTime ?? DateTime.UtcNow,
                    UserId = userId
                });
            }
        }

        return images;
    }

    public async Task<RosterImageDTO> GetImageByIdAsync(string fileName, string userId)
    {
        var blobContainerClient = _blobServiceClient.GetBlobContainerClient(_containerName);
        var blobClient = blobContainerClient.GetBlobClient(userId+"/"+fileName);

        if (await blobClient.ExistsAsync())
        {
            var properties = await blobClient.GetPropertiesAsync();
            return new RosterImageDTO
            {
                FileName = fileName,
                Url = blobClient.Uri.ToString(),
                UploadedAt = properties.Value.CreatedOn.UtcDateTime ,
                UserId = properties.Value.Metadata["UserId"]
            };
        }

        return null;
    }

    public async Task DeleteImageAsync(string fileName , string userId)
    {
        var blobContainerClient = _blobServiceClient.GetBlobContainerClient(_containerName);
        var blobClient = blobContainerClient.GetBlobClient(fileName);
        if (await blobClient.ExistsAsync())
        {
            await blobClient.DeleteAsync();
        }
    }
}
