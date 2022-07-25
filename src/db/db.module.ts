/* eslint-disable prettier/prettier */

import { TypeOrmModule } from "@nestjs/typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { DB } from "../config/application.config";

import { postgresT } from "../types/databaseTypes";

const CONFIG:PostgresConnectionOptions = {
  type: DB.type as postgresT, //🤔
  database: DB.name,
  host: DB.host,
  port: parseInt(DB.port),
  username: DB.username,
  password: DB.password,
  entities: ["dist/**/*.entity.js"],
  synchronize: false,
  migrations:["dist/src/db/migrations/*.ts"],
  // cli:{
  //   migrationsDir: "dist/src/db/migrations"
  // }
};

export default TypeOrmModule.forRoot(CONFIG);
