using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.Email;

namespace backend.Interfaces
{
    public interface IMailService
    {

        bool SendEmail(EmailDTO  emailRequest);
    }
}
