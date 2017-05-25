using System;
using System.Linq;
using Namster.Models;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using System.Security.Claims;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;

namespace Namster.Attributes
{
    public interface IAuthTokenFilter
    {
        Boolean checkAuth(string key);
    }
    public class AuthTokenFilter : IAuthTokenFilter
    {
        private string _validTokens;

        public AuthTokenFilter(IConfiguration configuration)
        {
            _validTokens = configuration["Auth:Tokens"];
        }

        public Boolean checkAuth(string key)
        {
            //First check the preferred token header
            var tokenHeader = key;

            string[] tokens = _validTokens.Split(',');

            foreach (string t in tokens)
            {
                if (t == key)
                {
                    return true;
                }
            }

            //Nothing is valid, so reject
            return false;
        }
    }
}