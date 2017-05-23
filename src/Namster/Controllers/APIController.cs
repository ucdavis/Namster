using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Namster.Models;
using Namster.Services;

namespace Namster.Controllers
{
    [Route("[controller]")]
    public class APIController : Controller
    {
        private readonly ISearchService _searchService;

        public APIController(ISearchService searchService)
        {
            _searchService = searchService;
        }

        [HttpGet("{term}")]
        public async Task<JsonResult> Get(string term, string building, string department, string vlan)
        {
            var results = await _searchService.FindByMatchAsync(term, building, department, vlan);
            return new JsonResult(new
            {
                results = results.Hits.Select(h => h.Source)
            });
        }

    }
}