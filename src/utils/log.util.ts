/* eslint-disable prettier/prettier */
import { DB } from "../config/application.config";

export const logLaunch = () => {
  console.log("Server was launched at", new Date().toUTCString());
  console.log("Database:", "\x1b[1m", DB.name);
};
