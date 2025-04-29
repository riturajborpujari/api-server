export interface IAppConfig {
  NODE_ENV: "dev" | "stag" | "prod";
  APP_NAME: string;
  APP_PORT: number;
  LOG_LEVEL: "error" | "warn" | "info" | "verbose" | "debug";

  API_KEY: string;
}
