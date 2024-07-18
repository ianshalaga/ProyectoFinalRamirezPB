import nodemailer from "nodemailer";
import config from "./env.config";

const mailOptions = {
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  port: 587,
  auth: {
    user: config.googleAppUsername,
    pass: config.googleAppPassword,
  },
};

const transportGoogle = nodemailer.createTransport(mailOptions);

export default transportGoogle;
