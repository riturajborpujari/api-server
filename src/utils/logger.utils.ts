import * as winston from "winston";

export const logger = winston.createLogger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 4,
    debug: 5
  },
  level: "info",
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.splat(),
    winston.format.printf(log =>
      [log.timestamp, log.level, log.message].join(": ")
    )
  )
});

export function setLogLevel(level: string) {
  logger.level = level;
}
