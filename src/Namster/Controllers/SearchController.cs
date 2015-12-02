using System;
using Microsoft.AspNet.Mvc;
using Namster.Models;

namespace Namster.Controllers
{
    public class SearchController : Controller
    {
        public DataNam[] Query(string term)
        {
            return new[]
            {
                new DataNam {NamNumber = "1234567"},
                new DataNam {NamNumber = "1234567"},
                new DataNam {NamNumber = "1234567"},
            };
        }
    }
}
