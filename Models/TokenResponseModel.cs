﻿using System;
namespace NG_Core_Auth.Models
{
    public class TokenResponseModel
    {
        public string token { get; set; } // jwt token
        public DateTime expiration { get; set; } // expiry time
        public string refresh_token { get; set; } // refresh token
        public string roles { get; set; } // user role
        public string username { get; set; } // user name
    }
}
