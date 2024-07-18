import winston from "winston";

export type CustomLogger = winston.Logger & {
  fatal: winston.LeveledLogMethod;
  error: winston.LeveledLogMethod;
  warning: winston.LeveledLogMethod;
  info: winston.LeveledLogMethod;
  http: winston.LeveledLogMethod;
  debug: winston.LeveledLogMethod;
};
