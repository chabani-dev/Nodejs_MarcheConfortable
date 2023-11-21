import nodemailer from "nodemailer";

module.exports.send = async function () {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "zergachabani@gmail.com",
      pass: "Zerga@0703",
    },
  });
  const mailOptions = {
    from: "zerkachabani@gmail.com",
    to: "nilaso4744@nexxterp.com",
    subject: "E-mail automatique",
    text: "Cette email est un email automatique",
  };
  await transporter.sendMail(mailOptions, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("email sent: " + info.response);
    }
  });
};
