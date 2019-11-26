using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthenticationService.Models
{
    public class User
    {
        /*
         * This class shouls have two properties(UserId,Password). UserId should not be auto generated.
         * */

        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string UserId { get; set; }
        public string Password { get; set; }
    }
}
