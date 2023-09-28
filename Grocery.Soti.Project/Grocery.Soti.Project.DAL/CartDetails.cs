using Grocery.Soti.Project.DAL.Interfaces;
using Grocery.Soti.Project.DAL.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grocery.Soti.Project.DAL
{
    public class CartDetails : ICart
    {
        private SqlConnection _connection = null;
        private SqlDataAdapter _adapter = null;
        /// <summary>
        /// Add to cart when user checkout
        /// </summary>
        /// <param name="cart"></param>
        /// <returns>return all the cart when user add it</returns>
        public bool AddToCart(Cart cart)
        {
            try
            {
                using (_connection = new SqlConnection(SqlConnectionString.GetConnectionString))
                {
                    using (_adapter = new SqlDataAdapter("usp_addToCart", _connection))
                    {
                        _adapter.SelectCommand.CommandType = CommandType.StoredProcedure;
                        _adapter.SelectCommand.Parameters.AddWithValue("@ProductId", cart.ProductId);
                        _adapter.SelectCommand.Parameters.AddWithValue("@ProductImage", cart.ProductImage);
                        _adapter.SelectCommand.Parameters.AddWithValue("@ProductDescription", cart.ProductDescription);
                        _adapter.SelectCommand.Parameters.AddWithValue("@ProductPrice", cart.ProductPrice);
                        _adapter.SelectCommand.Parameters.AddWithValue("@CartStock", cart.CartStock);
                        _adapter.SelectCommand.Parameters.AddWithValue("@UserId", cart.UserId);
                        _adapter.SelectCommand.Parameters.AddWithValue("@ProductName", cart.ProductName);
                        SqlParameter param = new SqlParameter("@return", SqlDbType.Int);
                        param.Direction = ParameterDirection.ReturnValue;
                        _adapter.SelectCommand.Parameters.Add(param);
                        using (DataSet _dataset = new DataSet())
                        {
                            _adapter.Fill(_dataset);
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
        /// Update cart stock with cart values
        /// </summary>
        /// <param name="cart"></param>
        /// <returns> return updated cart stock on cart page</returns>
        public int ChangeCartStock(Cart cart)
        {
            try
            {
                using (_connection = new SqlConnection(SqlConnectionString.GetConnectionString))
                {
                    using (_adapter = new SqlDataAdapter("usp_updateCartStock", _connection))
                    {
                        _adapter.SelectCommand.CommandType = CommandType.StoredProcedure;
                        _adapter.SelectCommand.Parameters.AddWithValue("@ProductId", cart.ProductId);
                        _adapter.SelectCommand.Parameters.AddWithValue("@CartStock", cart.CartStock);
                        _adapter.SelectCommand.Parameters.AddWithValue("@UserId", cart.UserId);
                        SqlParameter param = new SqlParameter("@return", SqlDbType.Int);
                        param.Direction = ParameterDirection.ReturnValue;
                        _adapter.SelectCommand.Parameters.Add(param);
                        using (DataSet _dataset = new DataSet())
                        {
                            _adapter.Fill(_dataset);
                            return Convert.ToInt32(param.Value);
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
        /// Deleting cart based on cart Id
        /// </summary>
        /// <param name="cartId"></param>
        /// <returns>return true or false</returns>
        public bool DeleteCart(int cartId)
        {
            try
            {
                using (_connection = new SqlConnection(SqlConnectionString.GetConnectionString))
                {
                    using (_adapter = new SqlDataAdapter("usp_deleteCart", _connection))
                    {
                        _adapter.SelectCommand.CommandType = CommandType.StoredProcedure;
                        _adapter.SelectCommand.Parameters.AddWithValue("@CartId", cartId);
                        SqlParameter param = new SqlParameter("@return", SqlDbType.Int);
                        param.Direction = ParameterDirection.ReturnValue;
                        _adapter.SelectCommand.Parameters.Add(param);
                        using (DataSet _dataset = new DataSet())
                        {
                            _adapter.Fill(_dataset);
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
        /// Geting cart details based on user Id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>return list of cart</returns>

        public List<Cart> GetCartByUserId(int userId)
        {
            try
            {
                using (_connection = new SqlConnection(SqlConnectionString.GetConnectionString))
                {
                    using (_adapter = new SqlDataAdapter("select * from Cart", _connection))
                    {
                        using (DataSet _dataset = new DataSet())
                        {
                            _adapter.Fill(_dataset, "Cart");
                            return _dataset.Tables[0].AsEnumerable().Select(x => new Cart
                            {
                                ProductId = Convert.ToInt32(x.Field<int>("ProductId")),
                                ProductName = Convert.ToString(x.Field<string>("ProductName")),
                                CartId = Convert.ToInt32(x.Field<int>("CartId")),
                                CartStock = Convert.ToInt32(x.Field<int>("CartStock")),
                                UserId = Convert.ToInt32(x.Field<int>("UserId")),
                                ProductPrice = Convert.ToInt32(x.Field<decimal>("ProductPrice")),
                                ProductDescription = Convert.ToString(x.Field<string>("ProductDescription")),
                                ProductImage = Convert.ToString(x.Field<string>("ProductImage"))
                            }).Where(cart => cart.UserId == userId).ToList();
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
    }
}
