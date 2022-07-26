/* eslint-disable prettier/prettier */

import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DB } from "../config/application.config";

import { postgresT } from "../types/databaseTypes";

export const CONFIG = {
  type: DB.type as postgresT,
  database: DB.name,
  host: DB.host,
  port: parseInt(DB.port),
  username: DB.username,
  password: DB.password,
  entities: ["dist/**/*.entity.js"],
  synchronize: false,
  migrations: ["dist/src/db/migrations/*.ts"],
} as TypeOrmModuleOptions;

export default TypeOrmModule.forRoot(CONFIG);
