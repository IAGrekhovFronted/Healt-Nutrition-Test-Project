using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SensorApi.Data;
using SensorApi.Models;

namespace SensorApi.Controllers
{
    [Route("api")]
    [ApiController]
    public class SensorController : ControllerBase
    {
        private readonly SensorDbContext _context;
        private readonly ILogger<SensorController> _logger;

        public SensorController(SensorDbContext context, ILogger<SensorController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("data")]
        public async Task<IActionResult> GetAllSensorData()
        {
            try
            {
                var sensorData = await _context.SensorData.ToListAsync();
                return Ok(sensorData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при получении данных сенсоров");
                return StatusCode(500, "Внутренняя ошибка сервера");
            }
        }


        [HttpPost("data")]
        public async Task<IActionResult> PostSensorData([FromBody] SensorData sensorData)
        {
            try
            {
                if (sensorData == null)
                    return BadRequest("Данные сенсора не переданы");

                sensorData.Timestamp = DateTime.UtcNow;

                await _context.SensorData.AddAsync(sensorData);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Добавлены новые данные для SensorId {SensorId}", sensorData.SensorId);

                return Ok(sensorData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при сохранении данных сенсора");
                return StatusCode(500, "Внутренняя ошибка сервера");
            }
        }

        [HttpGet("sensors/summary")]
        public async Task<IActionResult> GetSensorsSummary()
        {
            try
            {
                var summary = await _context.SensorData
                    .GroupBy(s => s.SensorId)
                    .Select(g => new
                    {
                        SensorId = g.Key,
                        Min = g.Min(s => s.Value),
                        Max = g.Max(s => s.Value),
                        Avg = g.Average(s => s.Value),
                        LastTimestamp = g.Max(s => s.Timestamp)
                    })
                    .ToListAsync();

                return Ok(summary);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при получении агрегированных данных сенсоров");
                return StatusCode(500, "Внутренняя ошибка сервера");
            }
        }
    }
}
