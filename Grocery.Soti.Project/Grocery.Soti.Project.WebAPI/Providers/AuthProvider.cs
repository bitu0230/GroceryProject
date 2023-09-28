using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Helpers;
using Grocery.Soti.Project.DAL;
using Microsoft.Owin.Security.OAuth;

namespace Grocery.Soti.Project.WebAPI.Providers
{
    public class AuthProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            UserDetails userDetails = new UserDetails();
            string passwordToCheck = context.Password + "2CxVKFLCejA3B4LJu7ocpg==";


            //var user = await userDetails.ValidateUserAsync(context.UserName, context.Password);
            var user = await userDetails.ValidateUserAsync(context.UserName, context.Password);
            var isVerified = Crypto.VerifyHashedPassword(user.Password, passwordToCheck);
            if (user != null && isVerified)
            {
                var identity = new ClaimsIdentity(context.Options.AuthenticationType);//Bearer Token
                identity.AddClaim(new Claim(ClaimTypes.Role, user.Roles));
                identity.AddClaim(new Claim(ClaimTypes.Email, user.EmailId));
                identity.AddClaim(new Claim(ClaimTypes.MobilePhone, user.MobileNumber));
                context.Validated(identity);
            }
            else
            {
                context.SetError("Invalid Details", "Either Username or Password is incorrect");
                return;
            }
        }
    }
}