using Grocery.Soti.Project.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grocery.Soti.Project.DAL.Interfaces
{
    public interface IAccount
    {
        Task<User> ValidateUserAsync(string emailId, string Password);

        User getUserRole(string userEmail);
    }
}
