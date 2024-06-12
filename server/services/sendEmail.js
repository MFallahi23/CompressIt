import main from "./email.js";

const sendEmail = (options = {}) => {
  const mailOptions = Object.assign({}, options, {
    from: process.env.EMAIL_FROM,
  });
  return main(mailOptions);
};

export default sendEmail;
