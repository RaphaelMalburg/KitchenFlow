using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.Account
{
    public class EmailBodies
    {
       public string RegisterEmail { get; set; } =@"
            <!DOCTYPE html>
            <html lang='en'>
            <head>
                <meta charset='UTF-8'>
                <title>Confirm Your Email Address</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        width: 100%;
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border: 1px solid #dddddd;
                    }
                    .header {
                        background-color: #4CAF50;
                        color: #ffffff;
                        padding: 10px 0;
                        text-align: center;
                    }
                    .content {
                        margin: 20px 0;
                        color: #333333;
                    }
                    .content a {
                        color: #4CAF50;
                        text-decoration: none;
                    }
                    .content a:hover {
                        text-decoration: underline;
                    }
                    .footer {
                        margin-top: 20px;
                        padding: 10px 0;
                        text-align: center;
                        background-color: #eeeeee;
                        color: #777777;
                    }
                </style>
            </head>
            <body>
                <div class='container'>
                    <div class='header'>
                        <h1>Kitchen Flow</h1>
                    </div>
                    <div class='content'>
                        <p>Dear User,</p>
                        <p>Please confirm your email address by clicking the link below:</p>
                        <p><a href='#URL#'>Click here</a></p>
                        <p>If you did not request this, please ignore this email.</p>
                        <p>Best regards,<br>Kitchen Flow</p>
                    </div>
                    <div class='footer'>
                        <p>&copy; 2024 Kitchen Flow. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            ";

            public string ContactUsConfirmationEmail { get; set; } = @"
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <title>Thank You for Contacting Us</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #dddddd;
        }
        .header {
            background-color: #4CAF50;
            color: #ffffff;
            padding: 10px 0;
            text-align: center;
        }
        .content {
            margin: 20px 0;
            color: #333333;
        }
        .content a {
            color: #4CAF50;
            text-decoration: none;
        }
        .content a:hover {
            text-decoration: underline;
        }
        .footer {
            margin-top: 20px;
            padding: 10px 0;
            text-align: center;
            background-color: #eeeeee;
            color: #777777;
        }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>Kitchen Flow</h1>
        </div>
        <div class='content'>
            <p>Dear User,</p>
            <p>Thank you for reaching out to us. We have received your question and our team will get back to you as soon as possible.</p>
            <p>If you have any additional questions or need further assistance, please feel free to reply to this email.</p>
            <p>Best regards,<br>Kitchen Flow Team</p>
        </div>
        <div class='footer'>
            <p>&copy; 2024 Kitchen Flow. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
";
public string ContactUsEmailToApp { get; set; } = @"
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <title>New Contact Us Submission</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #dddddd;
        }
        .header {
            background-color: #4CAF50;
            color: #ffffff;
            padding: 10px 0;
            text-align: center;
        }
        .content {
            margin: 20px 0;
            color: #333333;
        }
        .footer {
            margin-top: 20px;
            padding: 10px 0;
            text-align: center;
            background-color: #eeeeee;
            color: #777777;
        }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>New Contact Us Submission</h1>
        </div>
        <div class='content'>
            <p>Dear Admin,</p>
            <p>You have received a new question via the contact us page:</p>
            <p><strong>Name:</strong> #NAME#</p>
            <p><strong>Email:</strong> #EMAIL#</p>
            <p><strong>Question:</strong></p>
            <p>#QUESTION#</p>
            <p>Please respond to the user as soon as possible.</p>
            <p>Best regards,<br>Kitchen Flow</p>
        </div>
        <div class='footer'>
            <p>&copy; 2024 Kitchen Flow. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
";

            public string ResendEmailConfirmation { get; set; } =  @"
            <!DOCTYPE html>
            <html lang='en'>
            <head>
                <meta charset='UTF-8'>
                <title>Confirm Your Email Address</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        width: 100%;
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border: 1px solid #dddddd;
                    }
                    .header {
                        background-color: #4CAF50;
                        color: #ffffff;
                        padding: 10px 0;
                        text-align: center;
                    }
                    .content {
                        margin: 20px 0;
                        color: #333333;
                    }
                    .content a {
                        color: #4CAF50;
                        text-decoration: none;
                    }
                    .content a:hover {
                        text-decoration: underline;
                    }
                    .footer {
                        margin-top: 20px;
                        padding: 10px 0;
                        text-align: center;
                        background-color: #eeeeee;
                        color: #777777;
                    }
                </style>
            </head>
            <body>
                <div class='container'>
                    <div class='header'>
                        <h1>Kitchen Flow</h1>
                    </div>
                    <div class='content'>
                        <p>Dear User,</p>
                        <p>Please confirm your email address by clicking the link below:</p>
                        <p><a href='#URL#'>Click here</a></p>
                        <p>If you did not request this, please ignore this email.</p>
                        <p>Best regards,<br>Kitchen Flow</p>
                    </div>
                    <div class='footer'>
                        <p>&copy; 2024 Kitchen Flow. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            ";
            public string ConfirmationEmailSuccess { get; set; } = $@"
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Email Confirmation</title>
                        <style>
                            body {{
                                font-family: Arial, sans-serif;
                                margin: 0;
                                padding: 0;
                                background-color: #f4f4f4;
                            }}
                            .container {{
                                max-width: 600px;
                                margin: 50px auto;
                                background: #fff;
                                padding: 20px;
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            }}
                            h1 {{
                                color: #333;
                            }}
                            p {{
                                color: #666;
                            }}
                            a {{
                                color: #1E90FF;
                                text-decoration: none;
                            }}
                        </style>
                    </head>
                    <body>
                        <div class='container'>
                            <h1>Email Confirmed</h1>
                            <p>Thank you for confirming your email address.</p>
                            <p><a href='#URL#'>Return to our website</a></p>
                        </div>
                    </body>
                    </html>";
            public string ConfirmationEmailFail { get; set; } =  $@"
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Email Confirmation</title>
                        <style>
                            body {{
                                font-family: Arial, sans-serif;
                                margin: 0;
                                padding: 0;
                                background-color: #f4f4f4;
                            }}
                            .container {{
                                max-width: 600px;
                                margin: 50px auto;
                                background: #fff;
                                padding: 20px;
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            }}
                            h1 {{
                                color: #333;
                            }}
                            p {{
                                color: #666;
                            }}
                            a {{
                                color: #1E90FF;
                                text-decoration: none;
                            }}
                        </style>
                    </head>
                    <body>
                        <div class='container'>
                            <h1>Email Confirmation Failed</h1>
                            <p>There was an error confirming your email address. Please try again later.</p>
                            <p><a href='#URL#'>Return to our website</a></p>
                        </div>
                    </body>
                    </html>";


    }
}
