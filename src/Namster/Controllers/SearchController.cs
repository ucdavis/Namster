using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Namster.Models;
using Namster.Services;

namespace Namster.Controllers
{
    public class SearchController : Controller
    {
        private readonly ISearchService _searchService;

        public SearchController(ISearchService searchService)
        {
            _searchService = searchService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IEnumerable<DataNam>> Query(string term)
        {
            var results = await _searchService.FindByMatchAsync(term, 25);
            return results.Hits.Select(h => h.Source);
        }

        public async Task<IEnumerable<DataNam>> Filter(string field, string term)
        {
            var results = await _searchService.FilterByAsync(field, term);
            return results.Hits.Select(h => h.Source);
        }
    }
}
