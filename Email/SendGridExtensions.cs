using System;
using Microsoft.Extensions.DependencyInjection;
using NG_Core_Auth.Services;

namespace NG_Core_Auth.Email
{
    public static class SendGridExtensions
    {
        public static IServiceCollection AddSendGridEmailSender(this IServiceCollection services) 
        {
            services.AddTransient<IEmailSender, SendGridEmailSender>();

            return services;
         }
    }
}
