using System;
using MongoDB.Bson.Serialization.Attributes;

namespace CategoryService.Models
{
    public class Category
    {
        /*
	  This class should have five properties
	  (Id,Name,Description,CreatedBy,CreationDate). Out of these five fields, the field
	  Id should be annotated with [BsonId]. The value of CreationDate should not
	  be accepted from the user but should be always initialized with the system
	  date. 
	 */
        [BsonId]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreationDate { get; set; }

    }
}
