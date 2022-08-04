require("dotenv").config();

const env = process.env;

export const PORT = env.PORT;

export const JWT = {
  access: env.JWT_REFRESH_SECRET,
  refresh: env.JWT_ACCESS_SECRET,
};

export const DB = {
  type: env.DB_TYPE,
  name: env.DB_NAME,
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
};
