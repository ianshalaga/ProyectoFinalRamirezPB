import dotenv from "dotenv";
import { Command } from "commander";
import Environment from "../types/environment.enum";

const program = new Command();
program.option("--dao <dao>", "Data Access Object Selector", "mongodb").parse();
const dao: string = program.opts().dao;

const ENVIRONMENT: string = Environment.development;

dotenv.config({
  path:
    ENVIRONMENT === Environment.production
      ? "./.env.production"
      : "./.env.development",
});

export default {
  // DataBase
  dbUsername: process.env.MONGODB_USERNAME,
  dbPassword: process.env.MONGODB_PASSWORD,
  dbName: process.env.MONGODB_DBNAME,
  // GitHub Login
  githubClientId: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  // Cookies
  cookiesSecret: process.env.COOKIES_SECRET,
  // Session
  sessionSecret: process.env.SESSION_SECRET,
  // Admin
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
  // Port
  port: process.env.PORT,
  // DAO
  dao: dao,
  // Google Mail
  googleAppUsername: process.env.GOOGLE_APP_USERNAME,
  googleAppPassword: process.env.GOOGLE_APP_PASSWORD,
  // Twilio SMS
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER,
  // Environment
  nodeEnv: process.env.NODE_ENV,
};
