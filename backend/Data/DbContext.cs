using Microsoft.EntityFrameworkCore;
using SensorApi.Models;

namespace SensorApi.Data
{
    public class SensorDbContext : DbContext
    {
        public SensorDbContext(DbContextOptions<SensorDbContext> options) : base(options) { }

        public DbSet<SensorData> SensorData { get; set; } = null!;
    }
}