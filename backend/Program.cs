using System.Text;
using api.Service;
using backend.Data;
using backend.Interfaces;
using backend.Models;
using backend.Repository;
using backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Enable API documentation using Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    // Define the Swagger document
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });

    // Add JWT authentication to Swagger
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] { }
        }
    });

    // Add support for file uploads
    option.OperationFilter<FileUploadOperationFilter>();
});

// Dependency injection of repository services
builder.Services.AddScoped<IStoragePlaceRepository, StoragePlaceRepository>();
builder.Services.AddScoped<IStationRepository, StationRepository>();
builder.Services.AddScoped<IPrepListRepository, PrepListRepository>();
builder.Services.AddScoped<IPrepListItemRepository, PrepListItemRepository>();
builder.Services.AddScoped<IUnitMeasureRepository, UnitMeasureRepository>();
builder.Services.AddScoped<IAccountRepository, AccountRepository>();
builder.Services.AddScoped<IRecipesRepository, RecipeRepository>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IMailService, MailService>();
builder.Services.AddScoped<IRosterImageRepository, RosterImageRepository>();

// Add AutoMapper service
builder.Services.AddAutoMapper(typeof(Program).Assembly);

// Configure the database context with PostgreSQL
builder.Services.AddDbContext<ApplicationDBContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetSection("ConnectionStrings_Devv").Value);
});

// Read JWT configuration from appsettings
var jwtSection = builder.Configuration.GetSection("JwtConfig_Secret").Value;
var key = Encoding.ASCII.GetBytes(jwtSection);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("https://kitchenflow.azurewebsites.net")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// Configure Identity services with options for password settings
builder.Services.AddIdentity<AppUser, IdentityRole>(options =>
{
    options.SignIn.RequireConfirmedAccount = false;
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 6;
    options.Password.RequireNonAlphanumeric = false;
    options.Tokens.EmailConfirmationTokenProvider = TokenOptions.DefaultProvider;
}).AddEntityFrameworkStores<ApplicationDBContext>().AddDefaultTokenProviders();

// Add Authorization service
builder.Services.AddAuthorization();

// Add HTTP context accessor service
builder.Services.AddHttpContextAccessor();

// Configure Authentication service with JWT Bearer
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(jwt =>
{
    jwt.SaveToken = true;
    jwt.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false, // Disable issuer validation for development
        ValidateAudience = false, // Disable audience validation for development
        RequireExpirationTime = false, // Disable expiration time requirement for development
        ValidateLifetime = true // Enable lifetime validation
    };
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

// Serve default files like index.html
app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline for development environment

    app.UseSwagger();
    app.UseSwaggerUI();

app.UseHttpsRedirection();

// Enable CORS middleware
app.UseCors("AllowSpecificOrigin");

// Enable authentication middleware
app.UseAuthentication();

// Enable authorization middleware
app.UseAuthorization();

// Map controllers for API endpoints
app.MapControllers();

// Fallback to serve index.html for SPA (Single Page Application)
app.MapFallbackToFile("/index.html");

// Run the application
app.Run();
