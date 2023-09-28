using Grocery.Soti.Project.DAL.Interfaces;
using Grocery.Soti.Project.DAL.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Grocery.Soti.Project.DAL
{
     public class SearchProductByCategory : IProduct
    {
        private SqlConnection _connection = null;

        private SqlDataAdapter _adapter = null;

        private DataSet _ds = null;

        public List<Product> SearchProductByCategoryId(int categoryId)
        {
            using (_connection = new SqlConnection(SqlConnectionString.GetConnectionString()))
            {
                using (_adapter = new SqlDataAdapter("select * from Products ", _connection))
                {
                    using (_ds = new DataSet())
                    {
                        _adapter.Fill(_ds, "Products");

                        var product = _ds.Tables["Products"].AsEnumerable()
                                     .Select(x => new Product
                                     {
                                         ProductName = x.Field<string>("ProductName"),
                                         Description = x.Field<string>("Description"),
                                         UnitPrice = x.Field<decimal>("UnitPrice"),
                                         UnitsInStock = x.Field<int>("UnitsInStock"),
                                         CategoryId = x.Field<int>("CategoryId"),
                                     }).Where(x => x.CategoryId == categoryId).ToList();

                        return product;

                    }
                }

            }

        }
    }
}