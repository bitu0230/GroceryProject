using Grocery.Soti.Project.DAL;
using Grocery.Soti.Project.DAL.Interfaces;
using Grocery.Soti.Project.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Grocery.Soti.Project.WebAPI.Controllers
{
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api/soti/categories")]
    public class CategoriesController : ApiController
    {
        private readonly ICategory _categories = null;

        public CategoriesController(ICategory category)
        {
            _categories = category;
        }

        [HttpGet]
        [Route("GetAllCategories")]
        public IHttpActionResult GetAllCategories()
        {
            try
            {
                var dt = _categories.GetAllCategories();
                if (dt == null)
                {
                    return BadRequest();
                }
                return Ok(dt);
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        [Route("AddCategory")]
        public IHttpActionResult InsertCategory([FromBody] Category category)
        {
            try
            {
                var dt = _categories.InsertCategory(category.CategoryName, category.CategoryImage);
                if (!dt)
                {
                    return BadRequest();
                }
                return Ok(dt);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
