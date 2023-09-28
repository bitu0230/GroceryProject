using Grocery.Soti.Project.DAL.Interfaces;
using Grocery.Soti.Project.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Grocery.Soti.Project.WebAPI.Controllers
{
    [RoutePrefix("api/soti/cart")]
    public class CartController : ApiController
    {
        private readonly ICart _cart = null;
        public CartController(ICart cart)
        {
            _cart = cart;
        }

        [HttpGet]
        [Route("getCart")]
        public IHttpActionResult GetCartForUser([FromUri] int userId)
        {
            try
            {
                var result = _cart.GetCartByUserId(userId);
                if (result != null)
                {
                    return Ok(result);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }

        [HttpPost]
        [Route("addToCart")]
        public IHttpActionResult AddToCart([FromBody] Cart cart)
        {
            try
            {
                var result = _cart.AddToCart(cart);
                if (result)
                {
                    return Ok(result);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("deleteCart")]
        public IHttpActionResult DeleteCart([FromUri] int cartId)
        {
            try
            {
                var result = _cart.DeleteCart(cartId);
                if (result)
                {
                    return Ok(result);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("changeCartStock")]
        public IHttpActionResult ChangeCartStock([FromBody] Cart cart)
        {
            try
            {
                var result = _cart.ChangeCartStock(cart);
                if (result >= 0)
                {
                    return Ok(result);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
