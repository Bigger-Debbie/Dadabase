const nodemailer = require("nodemailer");
const catchAsync = require("./catchAsync");
const pug = require("pug");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Do Not Reply <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: "smtp.mandrillapp.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(subject, template) {
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      baseUrl: "https://thedadabase.net",
      url: this.url,
      subject,
    });

    const options = {
      from: this.from,
      to: this.to,
      subject: subject,
      html,
    };

    await this.newTransport().sendMail(options);
  }

  async verification() {
    await this.send("Account Verification", "verification");
  }

  async forgotPassword() {
    await this.send("Password Reset", "passwordReset");
  }
};
