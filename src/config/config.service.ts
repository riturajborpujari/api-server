import * as dotenv from "dotenv";
import * as R from "ramda";
import { IAppConfig } from "./config.interface";
import { REQUIRED_CONFIGS } from "./config.constants";
import { allTrue } from "../utils/bool";

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
  dotenv.config();
}

function sanitizeConfig(conf: any): IAppConfig {
  const config = {
    NODE_ENV: conf.NODE_ENV,
    APP_NAME: conf.APP_NAME,
    APP_PORT: Number(conf.APP_PORT),
  };

  const missingConfigs = REQUIRED_CONFIGS.filter((field) =>
    R.not(Reflect.has(config, field))
  );

  if (R.not(R.isEmpty(missingConfigs))) {
    throw new Error(
      `Invalid Env: Missing configs: ${missingConfigs.join(",")}`
    );
  }

  if (R.not(isLikeAppConfig(config))) {
    throw new Error("Invalid Env: Type mismatch");
  }

  return config as IAppConfig;
}

function isLikeAppConfig(conf: any): conf is IAppConfig {
  const isValid = allTrue(
    R.includes(conf.NODE_ENV, ["dev", "stag", "prod"]),
    typeof conf.APP_NAME === "string",
    typeof conf.APP_PORT === "number"
  );

  return isValid;
}
