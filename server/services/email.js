import nodemailer from "nodemailer";

const main = async (mailOptions) => {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: mailOptions?.from,
    to: mailOptions?.to,
    subject: mailOptions?.subject,
    text: mailOptions?.text,
    html: mailOptions?.html,
  });

  return info;
};

export default main;
