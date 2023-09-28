using Grocery.Soti.Project.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Grocery.Soti.Project.DAL.Interfaces
{
    public interface ICart
    {
        List<Cart> GetCartByUserId(int userId);
        Boolean AddToCart(Cart cart);
        Boolean DeleteCart(int cartId);
        int ChangeCartStock(Cart cart);
    }
}
