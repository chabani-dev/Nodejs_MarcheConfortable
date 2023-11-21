const express = require("express");
const router = new express.Router();
const nodemailer = require("nodemailer");

emailRouter.post("/register", (req, res) => {
  // console.log(req.body);

  const { email } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Envoi d'e-mails avec React et Nodejs",
      html: "<h1>Félicitations, vous avez envoyé avec succès l'e-mail</h1>",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error", error);
      } else {
        console.log("Email sent" + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
  } catch (error) {
    res.status(201).json({ status: 401, error });
  }
});

module.exports = router;
