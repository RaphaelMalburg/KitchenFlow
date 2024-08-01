using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.Account
{
    public class NewUserDTO
    {
        public string UserName { get; set; }
        [EmailAddress]
        public string Email { get; set; }

        public string Token { get; set; }

    }
}
/*
{


  "userName": "raphael.malburg@gmail.com",
  "email": "raphael.malburg@gmail.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNmI5OGNhYS05ZTEyLTQzZTAtYjYxMS0wZmI3ZmZmMTg2OTMiLCJzdWIiOiJyYXBoYWVsLm1hbGJ1cmdAZ21haWwuY29tIiwiZW1haWwiOlsicmFwaGFlbC5tYWxidXJnQGdtYWlsLmNvbSIsInJhcGhhZWwubWFsYnVyZ0BnbWFpbC5jb20iXSwianRpIjoiMGRlNTlhMDYtMGVkZC00Y2EwLWI5ZjYtMmJmNmQxYjJhNWY0IiwiaWF0IjoxNzIwNzEzOTE1LCJ1c2VySWQiOiJjNmI5OGNhYS05ZTEyLTQzZTAtYjYxMS0wZmI3ZmZmMTg2OTMiLCJ1c2VyTmFtZSI6InJhcGhhZWwubWFsYnVyZ0BnbWFpbC5jb20iLCJuYmYiOjE3MjA3MTM5MTUsImV4cCI6MTcyMDc0MjcxNX0.o9q9JR6eJWbPlY-k7h3NnoCRLzEPXKISRy1XroWOKyU"
}
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2YjM3ZjRlYS03NTA4LTQ2ZjUtYjQ0OC0wY2MzNDY1ZDMwNjUiLCJzdWIiOiJraXRjaGVuZmxvd2FwcEBnbWFpbC5jb20iLCJlbWFpbCI6WyJraXRjaGVuZmxvd2FwcEBnbWFpbC5jb20iLCJraXRjaGVuZmxvd2FwcEBnbWFpbC5jb20iXSwianRpIjoiNWY2OTNiMjAtNzdiMC00OTJiLWIzNTMtZTdhMTU0ZWRjY2Q5IiwiaWF0IjoxNzIwMTE2NzIxLCJ1c2VySWQiOiI2YjM3ZjRlYS03NTA4LTQ2ZjUtYjQ0OC0wY2MzNDY1ZDMwNjUiLCJ1c2VyTmFtZSI6ImtpdGNoZW5mbG93YXBwQGdtYWlsLmNvbSIsIm5iZiI6MTcyMDExNjcyMSwiZXhwIjoxNzIwMTIwMzIxfQ.a8HFSkH7odb5YU0Vnj70KxYHutzkrt1n7OxJV5FLjvQ
{
  "email": "kitchenflowapp@gmail.com",
  "password": "Rcmalburg321"
}
{
  "email": "user1@example.com",
  "password": "Rcmalburg321"
}
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJiMTc2YmU4LTRlNjMtNDc4NC1hOTVkLTljMTBjMTA1ZWNjZCIsInN1YiI6InVzZXIxQGV4YW1wbGUuY29tIiwiZW1haWwiOiJ1c2VyMUBleGFtcGxlLmNvbSIsImp0aSI6ImZiNDA3MGJiLTA4MjAtNDc3NS04YzRkLTRkMzdiMzBmMDgzYSIsImlhdCI6MTcxOTU3NDQxNCwibmJmIjoxNzE5NTc0NDE0LCJleHAiOjE3MTk1NzgwMTR9.0KiFjyve4djYBN-KHfh7T4g-QlHxX0Z_GJQ3wigcEtY
*/


/*
Console.WriteLine();
{
  "email": "use123r@example.com",
  "password": "strasdasASD33ing"
}


eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2Y2Q4MDUxZS1lNDFmLTRlNWItYWQyYS01ZjkzM2E2Mjg2Y2EiLCJzdWIiOiJ1c2UxMjNyQGV4YW1wbGUuY29tIiwiZW1haWwiOiJ1c2UxMjNyQGV4YW1wbGUuY29tIiwianRpIjoiZTQ1NmVjODgtMzMwMi00MDgwLTlmMTQtZWFlYTQyNGZlMTBkIiwiaWF0IjoxNzE5NTc1MTk2LCJuYmYiOjE3MTk1NzUxOTYsImV4cCI6MTcxOTU3ODc5Nn0.WGl5IinUvWAQ2BUMTrgQNV7ESOqYl8eROIvToQqowyg



{

  "email": "kitchenflowapp@gmail.com",
  "password": "strasdasASD33ing"

}

*/
