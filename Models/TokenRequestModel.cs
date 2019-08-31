﻿using System;
namespace NG_Core_Auth.Models
{
    public class TokenRequestModel
    {
        public string GrantType { get; set; } // password or refresh_token
        public string ClientId { get; set; }
        public string UserName { get; set; }
        public string RefreshToken { get; set; }
        public string Password { get; set; }
    }
}
