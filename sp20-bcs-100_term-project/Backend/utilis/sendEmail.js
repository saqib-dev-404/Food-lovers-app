const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  //1) Create a transporter
  const transporter = nodemailer.createTransport({
    // service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    service: process.env.SMTP_SERVICE,
    port: process.env.SMTP_PORT,
    secure: true, // true for 465, false for other ports
    logger: true,
    debug: true,
    secureConnection: false,
    host: process.env.SMTP_HOST,
  });

  //2) Define the email options
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  //3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
