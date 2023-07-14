export interface IAppConfig {
  NODE_ENV: "dev" | "stag" | "prod";
  APP_NAME: string;
  APP_PORT: number;

  API_SECRET: string;
}
