import * as R from "ramda";
import * as path from "path";
import * as dotenv from "dotenv";
import { IAppConfig } from "./config.interface";
import { REQUIRED_CONFIGS } from "./config.constants";
import { allTrue } from "../utils/bool.utils";

let config = {} as IAppConfig;

export function configure() {
  loadEnvFile();

  const conf = sanitizeConfig(process.env);

  setConfig(conf);
}

export function getConfig() {
  return config;
}

function setConfig(conf: IAppConfig) {
  config = conf;
}

function loadEnvFile() {
  const envFilePath = path.resolve(__dirname, "../../environment/.env");
  dotenv.config({ path: envFilePath });
}

function sanitizeConfig(conf: any): IAppConfig {
  const sanitizedConfig = {
    NODE_ENV: conf.NODE_ENV,
    APP_NAME: conf.APP_NAME,
    APP_PORT: Number(conf.APP_PORT),
    LOG_LEVEL: conf.LOG_LEVEL,

    API_KEY: conf.API_KEY
  };

  const missingConfigs = REQUIRED_CONFIGS.filter(field =>
    R.not(Reflect.has(sanitizedConfig, field))
  );

  if (R.not(R.isEmpty(missingConfigs))) {
    throw new Error(
      `Invalid Env: Missing configs: ${missingConfigs.join(",")}`
    );
  }

  if (R.not(isLikeAppConfig(sanitizedConfig))) {
    throw new Error("Invalid Env: Type mismatch");
  }

  return sanitizedConfig as IAppConfig;
}

function isLikeAppConfig(conf: any): conf is IAppConfig {
  const isValid = allTrue(
    R.includes(conf.NODE_ENV, ["dev", "stag", "prod"]),
    typeof conf.APP_NAME === "string",
    typeof conf.APP_PORT === "number",
    R.includes(conf.LOG_LEVEL, ["error", "warn", "info", "verbose", "debug"]),
    typeof conf.API_KEY === "string"
  );

  return isValid;
}
