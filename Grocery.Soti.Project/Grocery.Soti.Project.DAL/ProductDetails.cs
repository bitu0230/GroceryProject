using Grocery.Soti.Project.DAL.Interfaces;
using Grocery.Soti.Project.DAL.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Grocery.Soti.Project.DAL
{
    public class ProductDetails : IProduct
    {
        private SqlConnection _connection = null;
        private SqlDataAdapter _adapter = null;
        private DataSet _dataset = null;
        private SqlCommand _command = null;
        private DataTable _dt = null;
        private SqlDataReader _reader = null;

        /// <summary>
        /// Get Product By Id
        /// </summary>
        /// <param name="productId">productId as a param</param>
        /// <returns>Products that matches to product Id</returns>
        public Product GetProductById(int productId)
        {
            try
            {
                using (_connection = new SqlConnection(SqlConnectionString.GetConnectionString))
                {
                    using (_adapter = new SqlDataAdapter("select * from Products", _connection))
                    {
                        using (_dataset = new DataSet())
                        {

                            _adapter.Fill(_dataset, "Products");
                            return _dataset.Tables["Products"].AsEnumerable().Select(x =>
                            new Product
                            {
                                ProductId = Convert.ToInt32(x.Field<int>("ProductId")),
                                ProductName = Convert.ToString(x.Field<string>("ProductName")),
                                Description = Convert.ToString(x.Field<string>("Description")),
                                UnitPrice = Convert.ToDecimal(x.Field<decimal>("UnitPrice")),
                                UnitsInStock = Convert.ToInt32(x.Field<int>("UnitsInStock")),
                                Discontinued = Convert.ToBoolean(x.Field<bool>("Discontinued")),
                                CategoryId = Convert.ToInt32(x.Field<int>("CategoryId")),
                                ProductImage = Convert.ToString(x.Field<string>("ProductImage"))
                            }).FirstOrDefault(p => p.ProductId == productId);
                        }
                    }
                }

            }
            catch (DBConcurrencyException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Search Product by Product name and product Price
        /// </summary>
        /// <param name="productName"></param>
        /// <param name="productPrice"></param>
        /// <returns> Returns products related to search and price</returns>

        public List<Product> searchProduct(string productName, decimal? productPrice)
        {
            try
            {
                using (_connection = new SqlConnection(SqlConnectionString.GetConnectionString))
                {
                    using (_adapter = new SqlDataAdapter("select * from Products", _connection))
                    {
                        using (_dataset = new DataSet())
                        {
                            Regex regex = new Regex("");
                            if (productName != null)
                            {
                                regex = new Regex(productName.Trim().ToLower());

                            }
                            if (productPrice == null)
                            {
                                productPrice = 0;
                            }
                            _ = new SqlCommandBuilder(_adapter);
                            _adapter.Fill(_dataset, "Products");

                            return _dataset.Tables["Products"].AsEnumerable().Select(x =>
                            new Product
                            {
                                ProductId = Convert.ToInt32(x.Field<int>("ProductId")),
                                ProductName = Convert.ToString(x.Field<string>("ProductName")),
                                Description = Convert.ToString(x.Field<string>("Description")),
                                UnitPrice = Convert.ToDecimal(x.Field<decimal>("UnitPrice")),
                                UnitsInStock = Convert.ToInt32(x.Field<int>("UnitsInStock")),
                                Discontinued = Convert.ToBoolean(x.Field<bool>("Discontinued")),
                                CategoryId = Convert.ToInt32(x.Field<int>("CategoryId")),
                                ProductImage = Convert.ToString(x.Field<string>("ProductImage"))
                            }).Where(p => ((regex.IsMatch(p.ProductName) || regex.IsMatch(p.ProductName.ToLower())) && p.UnitPrice > productPrice)).ToList();
                        }
                    }
                }
            }
            catch (DBConcurrencyException e)
            {
                throw e;
            }

            catch (Exception ex)
            {
                throw ex;
            }


        }

        /// <summary>
        ///     List Product realted to category
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns>return products when we click on category</returns>

        public List<Product> ListProducts(int categoryId)
        {
            try
            {

                using (_connection = new SqlConnection(SqlConnectionString.GetConnectionString))
                {
                    using (_adapter = new SqlDataAdapter("select * from Products ", _connection))
                    {
                        using (_dataset = new DataSet())
                        {
                            _adapter.Fill(_dataset, "Products");

                            var product = _dataset.Tables["Products"].AsEnumerable()
                                         .Select(x => new Product
                                         {
                                             ProductId = x.Field<int>("ProductId"),
                                             ProductName = x.Field<string>("ProductName"),
                                             Description = x.Field<string>("Description"),
                                             UnitPrice = x.Field<decimal>("UnitPrice"),
                                             UnitsInStock = x.Field<int>("UnitsInStock"),
                                             CategoryId = x.Field<int>("CategoryId"),
                                             Discontinued = x.Field<Boolean>("Discontinued"),
                                             ProductImage = x.Field<string>("ProductImage")
                                         }).Where(x => x.CategoryId == categoryId).ToList();

                            return product;

                        }
                    }

                }
            }
            catch (DBConcurrencyException e)
            {
                throw e;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        /// <summary>
        /// List all categories on home page
        /// </summary>
        /// <returns> return all categories</returns>
        public List<Product> GetAllProducts()
        {
            try
            {
                List<Product> products = new List<Product>();
                using (_connection = new SqlConnection(SqlConnectionString.GetConnectionString))
                {
                    using (_command = new SqlCommand("Select * from Products", _connection))
                    {
                        if (_connection.State != ConnectionState.Open)
                        {
                            _connection.Open();
                        }
                        using (_reader = _command.ExecuteReader())
                        {
                            if (_reader.HasRows)
                            {
                                while (_reader.Read())
                                {
                                    products.Add(new Product
                                    {
                                        ProductId = Convert.ToInt32(_reader.GetValue(0)),
                                        ProductName = _reader.GetValue(1).ToString(),
                                        Description = _reader.GetValue(2).ToString(),
                                        UnitPrice = Convert.ToDecimal(_reader.GetValue(3)),
                                        UnitsInStock = Convert.ToInt32(_reader.GetValue(4)),
                                        Discontinued = Convert.ToBoolean(_reader.GetValue(5)),
                                        CategoryId = Convert.ToInt32(_reader.GetValue(6)),
                                        CreatedDate = Convert.ToDateTime(_reader.GetValue(7)),
                                        // ModifiedDate=Convert.ToDateTime(_reader?.GetValue(8)),
                                        ProductImage = _reader.GetValue(9).ToString()
                                    });
                                }
                            }
                        }
                    }
                }
                return products;
            }
            catch (SqlException e)
            {
                throw e;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Product Edit by an Admin role
        /// </summary>
        /// <param name="productId"></param>
        /// <param name="productName"></param>
        /// <param name="description"></param>
        /// <param name="unitPrice"></param>
        /// <param name="unitInStock"></param>
        /// <param name="discontinued"></param>
        /// <param name="categoryId"></param>
        /// <param name="productImageUrl"></param>
        /// <returns> Return an edit products</returns>

        public bool EditProduct(int productId, string productName, string description, decimal unitPrice, int unitInStock, bool discontinued, int categoryId, string productImageUrl)
        {
            try
            {
                using (_connection = new SqlConnection(SqlConnectionString.GetConnectionString))
                {
                    using (_adapter = new SqlDataAdapter("usp_UpdateProduct", _connection))
                    {
                        _adapter.SelectCommand.CommandType = CommandType.StoredProcedure;
                        _adapter.SelectCommand.Parameters.AddWithValue("@ProductId", productId);
                        _adapter.SelectCommand.Parameters.AddWithValue("@ProductName", productName);
                        _adapter.SelectCommand.Parameters.AddWithValue("@Description", description);
                        _adapter.SelectCommand.Parameters.AddWithValue("@UnitPrice", unitPrice);
                        _adapter.SelectCommand.Parameters.AddWithValue("@UnitInStock", unitInStock);
                        _adapter.SelectCommand.Parameters.AddWithValue("@Discontinued", discontinued);
                        _adapter.SelectCommand.Parameters.AddWithValue("@CategoryId", categoryId);
                        _adapter.SelectCommand.Parameters.AddWithValue("@ProductImage", productImageUrl);


                        SqlParameter param = new SqlParameter("@return", SqlDbType.Int);
                        param.Direction = ParameterDirection.ReturnValue;
                        _adapter.SelectCommand.Parameters.Add(param);
                        using (_dt = new DataTable())
                        {
                            _adapter.Fill(_dt);
                            return Convert.ToInt32(param.Value) > 0;
                        }

                    }

                }
            }
            catch (DBConcurrencyException e)
            {
                throw e;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Add Product by an "admin" role
        /// </summary>
        /// <param name="product"></param>
        /// <returns>Return add new product on home page</returns>
        public bool AddProduct(Product product)
        {
            try
            {
                using (_connection = new SqlConnection(SqlConnectionString.GetConnectionString))
                {
                    using (_command = new SqlCommand("usp_AddProduct", _connection))
                    {
                        _command.CommandType = System.Data.CommandType.StoredProcedure;
                        _command.Parameters.AddWithValue("@ProductName", product.ProductName);
                        _command.Parameters.AddWithValue("@Description", product.Description);
                        _command.Parameters.AddWithValue("@UnitPrice", product.UnitPrice);
                        _command.Parameters.AddWithValue("@UnitsInStock", product.UnitsInStock);
                        _command.Parameters.AddWithValue("@Discontinued", product.Discontinued);
                        _command.Parameters.AddWithValue("@CategoryId", product.CategoryId);
                        _command.Parameters.AddWithValue("@ProductImage", product.ProductImage);
                        if (_connection.State == ConnectionState.Closed)
                        {
                            _connection.Open();
                        }
                        var result1 = _command.ExecuteNonQuery();
                        return result1 > 0;
                    }
                }
            }
            catch (SqlException e)
            {
                throw e;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
