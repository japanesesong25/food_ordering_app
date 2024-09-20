const nodemailer = require('nodemailer');

const mailSender = async (email, body) => {
  try {
    // Create a Transporter to send emails
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "mernfood973@gmail.com",
          pass: "uyuv tjip cieq msxg",
        },
      });
    // Send emails to users
    let info = await transporter.sendMail({
      from: 'Food Lvoer',
      to: email,
      subject: "K cha bro",
      html: HTML_TEMPLATE(body),
    });
    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.log(error.message);
    throw new Error('Error while sending mail')
  }
};

const HTML_TEMPLATE = (text) => { 
    return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Food App</title>
    <style>
      .container {
        width: 100%;
        height: 100%;
        padding: 20px;
        background-color: #f4f4f4;
      }
      .email {
        width: 80%;
        margin: 0 auto;
        background-color: #fff;
        padding: 20px;
      }
      .email-header {
        background-color: #333;
        color: #fff;
        padding: 20px;
        text-align: center;
      }
      .email-body {
        padding: 20px;
      }
      .email-footer {
        background-color: #333;
        color: #fff;
        padding: 20px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="email">
        <div class="email-header">
          <h1>MERN FOOD</h1>
        </div>
        <div class="email-body">
          <p>${text}</p>
        </div>
        <div class="email-footer">
          <p>MERN FOOD</p>
        </div>
      </div>
    </div>
  </body>
</html>`
    }


module.exports = mailSender;

