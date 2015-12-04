using System;
using Microsoft.AspNet.Mvc;
using Namster.Models;

namespace Namster.Controllers
{
    public class SearchController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public DataNam[] Query(string term)
        {
            return new[]
            {
                new DataNam {NamNumber = "1234567"},
                new DataNam {NamNumber = "1234568"},
                new DataNam {NamNumber = "1234569"},
            };
        }
    }
}
