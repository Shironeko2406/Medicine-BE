using FluentValidation;
using MedicineDoseTracker;
using MedicineDoseTracker.Interfaces;
using MedicineDoseTracker.Jobs;
using MedicineDoseTracker.Mappers;
using MedicineDoseTracker.Models.DTO;
using MedicineDoseTracker.Repositories.Generic;
using MedicineDoseTracker.Repositories.MedicineRepo;
using MedicineDoseTracker.Repositories.ReminderRepo;
using MedicineDoseTracker.Repositories.UnitOfWork;
using MedicineDoseTracker.Repositories.User;
using MedicineDoseTracker.Repositories.UserLoginRepo;
using MedicineDoseTracker.Repositories.UserRepo;
using MedicineDoseTracker.Services;
using MedicineDoseTracker.Validators;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Quartz;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MedicineConnect")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.EnableAnnotations();

    // Thêm cấu hình bảo mật (Security Definition)
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter 'Bearer' [space] and then your valid JWT token.\nExample: Bearer eyJhbGciOiJIUzI1NiIsInR..."
    });

    // Thêm yêu cầu bảo mật (Security Requirement)
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
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
            new string[] {} // No specific scopes
        }
    });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder
            .AllowAnyOrigin()      // hoặc .WithOrigins("http://localhost:3000") nếu muốn cụ thể
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

builder.Services.AddQuartz(q =>
{
    var vietnamTimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
    var currentTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, vietnamTimeZone);

    q.UseMicrosoftDependencyInjectionJobFactory();
    var jobKey = new JobKey("ReminderEmailJob");
    q.AddJob<ReminderEmailJob>(opts => opts.WithIdentity(jobKey));
    q.AddTrigger(opts => opts
        .ForJob(jobKey)
        .WithIdentity("ReminderEmailJob-trigger")
        .WithSchedule(
            CronScheduleBuilder
                .DailyAtHourAndMinute(7, 0)
                .InTimeZone(vietnamTimeZone)
        )
    );
});

//Đăng ký DI
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IMedicineRepository, MedicineRepository>();
builder.Services.AddScoped<IUserLoginRepository, UserLoginRepository>();
builder.Services.AddScoped<IReminderRepository, ReminderRepository>();

//Đăng ký service
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IMedicineService, MedicineService>();
builder.Services.AddScoped<IReminderService, ReminderService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<ICurrentTimeService, CurrentTimeService>();
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
builder.Services.AddScoped<IJWTService, JWTService>();
builder.Services.AddScoped<IClaimsService, ClaimsService>();

//Validator
builder.Services.AddScoped<IValidator<RegisterUserDTO>, RegisterUserDTOValidator>();


//-------------------------------------------------------------------
builder.Services.AddHttpContextAccessor();
builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

builder.Services.AddQuartzHostedService(q => q.WaitForJobsToComplete = true);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
            ValidAudience = builder.Configuration["JwtSettings:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:SecretKey"]))
        };
    });

builder.Services.AddAuthorization();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
