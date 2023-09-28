using Grocery.Soti.Project.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Grocery.Soti.Project.WebAPI.Controllers
{
     [RoutePrefix("api/soti/products")]
    public class SearchProductByCategoryIdController : ApiController
    {
        private readonly ISearchProductByCategoryId _Product = null;

        public SearchProductByCategoryIdController(ISearchProductByCategoryId SearchProduct)
        {
            _Product = SearchProduct;
        }

        [HttpGet]

        [Route("{CategoryId}")]

        public IHttpActionResult SearchProductByCategoryId([FromUri] int CategoryId)
        {
            var searchProduct = _Product.SearchProductByCategoryId(CategoryId);

            if (searchProduct == null)
            {
                return NotFound();
            }
            return Ok(searchProduct);
        }


    }
}