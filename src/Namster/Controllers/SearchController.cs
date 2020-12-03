using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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

        public async Task<JsonResult> Query(string term, string building, string department, string vlan)
        {
            var results = await _searchService.FindByMatchAsync(term, building, department, vlan);

            var aggregates = new Dictionary<string, dynamic>();

            foreach (var key in results.Aggregations.Keys) {
                aggregates.Add(key, new { items = results.Aggregations.Terms(key).Buckets.Select(b => new { key = b.Key, docCount = b.DocCount}).ToArray() });
            }

            return new JsonResult(new
            {
                results = results.Hits.Select(h => h.Source),
                aggregates
            });
        }

        public async Task<IEnumerable<DataNam>> Filter(string room, string building, string department, string vlan)
        {
            var results = await _searchService.FilterNamsAsync(room, building, department, vlan);
            return results.Hits.Select(h => h.Source);
        }
    }
}