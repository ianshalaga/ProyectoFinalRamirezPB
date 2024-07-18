import winston from "winston";
import { CustomLogger } from "../types/logger.type";
import config from "../config/env.config";

const customLevelOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "brightRed",
    error: "red",
    warning: "yellow",
    info: "green",
    http: "cyan",
    debug: "blue",
  },
};

winston.addColors(customLevelOptions.colors);

const loggerFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// DEVELOPMENT
const loggerDevelopment = winston.createLogger({
  levels: customLevelOptions.levels,
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp(),
    loggerFormat
  ),
  transports: [new winston.transports.Console({ level: "debug" })],
});

// PRODUCTION
const loggerProduction = winston.createLogger({
  levels: customLevelOptions.levels,
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp(),
    loggerFormat
  ),
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({
      filename: "./src/data/errors.log",
      level: "error",
    }),
  ],
});

const logger =
  config.nodeEnv === "production" ? loggerProduction : loggerDevelopment;

export default logger as CustomLogger;
