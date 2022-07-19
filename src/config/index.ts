/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */

require("dotenv").config();

const env = process.env;

export const PORT = env.PORT;

export const JWT = {
  secret: env.JWT_SECRET,
};

export const DB = {
  type: env.DB_TYPE,
  name: env.DB_NAME,
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
};
