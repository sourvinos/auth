using System;
namespace NG_Core_Auth.Models
{
    public class TokenResponseModel
    {
        public string token { get; set; }
        public DateTime expiration { get; set; }
        public string refresh_token { get; set; }
        public string roles { get; set; }
        public string username { get; set; }
    }
}
