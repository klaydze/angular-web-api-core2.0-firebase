using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace WebApi.Models
{
    public interface IFirebaseIssuerKeyProvider
    {
         Task<IEnumerable<X509SecurityKey>> GetSigningKeys();
    }
}