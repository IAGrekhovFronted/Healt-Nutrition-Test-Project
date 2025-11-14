using Microsoft.EntityFrameworkCore;
using SensorApi.Data;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<SensorDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

var maxRetries = 10;
var delayMs = 5000;

for (int i = 0; i < maxRetries; i++)
{
    try
    {
        using var scope = app.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<SensorDbContext>();
        db.Database.Migrate();
        Console.WriteLine("Database migrated successfully.");
        break;
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Database migration failed. Retry {i + 1}/{maxRetries}...");
        Console.WriteLine(ex.Message);
        if (i == maxRetries - 1)
            throw;
        Thread.Sleep(delayMs);
    }
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseSwagger();
app.UseSwaggerUI();
app.UseAuthorization();
app.MapControllers();

app.Run();
