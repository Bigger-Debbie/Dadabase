const nodemailer = require("nodemailer");
const catchAsync = require("./catchAsync");

module.exports = class Email {
  constructor(user) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.from = `Do Not Reply <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(subject, message) {
    const options = {
      from: this.from,
      to: this.to,
      subject: subject,
      text: message,
      html: `<p>${message}</p>`,
    };

    await this.newTransport().sendMail(options);
  }

  async forgotPassword(resetPath) {
    await this.send(
      "Password Reset",
      `Your Password Reset Endpoint: ${resetPath}`
    );
  }
};
