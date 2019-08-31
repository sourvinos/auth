using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace NG_Core_Auth.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Notes { get; set; }
        public int Type { get; set; }
        public string DisplayName { get; set; }
        public virtual List<TokenModel> Tokens { get; set; }
    }
}
