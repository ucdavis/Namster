using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Namster.Models;
using Namster.Services;
using Namster.Attributes;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Namster.Controllers
{
    [Route("[controller]")]
    public class APIController : Controller
    {
        private readonly ISearchService _searchService;
        private readonly IAuthTokenFilter _authClass;
        public APIController(ISearchService searchService, IAuthTokenFilter authServ)
        {
            _searchService = searchService;
            _authClass = authServ;
        }

        [HttpGet]
        [Route("/apisearch/{term}")]
        public async Task<JsonResult> Get(string term, string key, string building, string department, string vlan)
        {
            var auth = key;
            var authorized = _authClass.checkAuth(key);
            if (!authorized)
            {
                return new JsonResult (new
                {
                });
            }
            var results = await _searchService.FindByMatchAsync(term, building, department, vlan);
            return new JsonResult(new
            {
                results = results.Hits.Select(h => h.Source)
            });
        }

    }
}