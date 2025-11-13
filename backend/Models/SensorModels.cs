using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace SensorApi.Models
{
    [Table("sensors", Schema = "public")]
    public class SensorData
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int SensorId { get; set; }
        [Required]
        public DateTime Timestamp { get; set; }
        [Required]
        public float Value { get; set; }
    }
}