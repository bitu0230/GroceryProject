using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grocery.Soti.Project.DAL.Models
{
    public class User
    {
        //public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int UserId { get; set; }


        public string MobileNumber { get; set; }

        public string EmailId { get; set; }
        public DateTime CreatedDate { get; set; }

        public string Password { get; set; }
        public string Roles { get; set; }


    }
}