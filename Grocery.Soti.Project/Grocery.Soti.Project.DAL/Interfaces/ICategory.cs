using Grocery.Soti.Project.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grocery.Soti.Project.DAL.Interfaces
{
    public interface ICategory
    {
        bool InsertCategory(string categoryName, string categoryImgUrl);
        List<Category> GetAllCategories();

    }
}
