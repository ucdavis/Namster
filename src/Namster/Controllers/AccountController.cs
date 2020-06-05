using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetCore.Security.CAS;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Namster.Models;

namespace Namster.Controllers
{
    public class AccountController : Controller
    {
        private readonly AuthSettings _authSettings;

        public AccountController(IOptions<AuthSettings> authSettings)
        {

            _authSettings = authSettings.Value;
        }
        public IActionResult AccessDenied()
        {
            return View();
        }

        [Route("logout")]
        public async Task<ActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return Redirect($"{_authSettings.CasBaseUrl}logout");
        }

        [AllowAnonymous]
        [Route("login")]
        public async Task Login(string returnUrl)
        {
            var props = new AuthenticationProperties { RedirectUri = returnUrl };
            await HttpContext.ChallengeAsync(CasDefaults.AuthenticationScheme, props);
        }
    }
}
