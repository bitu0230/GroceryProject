using Grocery.Soti.Project.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grocery.Soti.Project.DAL.Interfaces
{
    public interface IProduct
    {
        Product GetProductById(int productId);

        List<Product> searchProduct(string productName, decimal? productPrice);

        //Search Product by categoryId

        List<Product> ListProducts(int CategoryId);

        List<Product> GetAllProducts();
        bool EditProduct(int productId, string productName, string description, decimal unitPrice, int unitInStock, bool discontinued, int categoryId, string productImageUrl);
        bool AddProduct(Product product);
    }
}
