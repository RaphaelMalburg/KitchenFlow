
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.Email;
using backend.Interfaces;
using MailKit.Net.Smtp;
using MimeKit;
using MimeKit.Text;

namespace backend.Services
{
    public class MailService : IMailService
    {
        private  readonly IConfiguration _config;
        public MailService(IConfiguration config)
        {
            _config = config;
        }
        public bool SendEmail(EmailDTO emailRequest)
        {

            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("kitchenflowapp@gmail.com"));//
            email.To.Add(MailboxAddress.Parse(emailRequest.To));
            email.Subject = emailRequest.Subject;;
            email.Body = new TextPart(TextFormat.Html) { Text = emailRequest.Body };

                using (var client = new SmtpClient())
             {

            try
            {
            client.Connect("in-v3.mailjet.com", 587, MailKit.Security.SecureSocketOptions.StartTls); // smtp.gmail.com   smtp.ethereal.email
            client.Authenticate(_config.GetSection("MailJet_Apikey").Value, _config.GetSection("MailJet_Apisecretkey").Value);

            var result =client.Send(email);
            Console.WriteLine(result+"result --------------------------------");
            client.Disconnect(true);
            return true;
             }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                Console.WriteLine(ex.StackTrace);

                throw;

            }
        }
        }
    }
}
