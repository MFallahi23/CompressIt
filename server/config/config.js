import dotenv from "dotenv";
dotenv.config();

const config = {
  development: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "development_db",
  },
  test: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "development_db",
  },
  production: {
    host: process.env.DB_HOST_PROD,
    port: process.env.DB_PORT_PROD,
    user: process.env.DB_USERNAME_PROD,
    password: process.env.DB_PASSWORD_PROD,
    databaseName: process.env.DB_NAME_PROD,
  },
};

export default config;
