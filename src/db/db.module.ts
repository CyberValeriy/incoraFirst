/* eslint-disable prettier/prettier */

import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DB } from "../config/application.config";

import { Users } from "../users/users.entity";
import { Product } from "../products/product.entity";
import { Orders } from "../orders/order.entity";
import { OrderItem } from "../orders/orderItems.entity";

import { postgresT } from "../types/databaseTypes";

const CONFIG: TypeOrmModuleOptions = {
  type: DB.type as postgresT, //🤔
  database: DB.name,
  host: DB.host,
  port: parseInt(DB.port),
  username: DB.username,
  password: DB.password,
  entities: [Users, Product, Orders, OrderItem],
  synchronize: true,
};

export default TypeOrmModule.forRoot(CONFIG);
