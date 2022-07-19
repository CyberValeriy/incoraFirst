/* eslint-disable prettier/prettier */

import { TypeOrmModule } from "@nestjs/typeorm";
import { DB } from "./index";

import { Users } from "../users/users.entity";
import { Product } from "../products/product.entity";
import { Order } from "../orders/order.entity";

const CONFIG: any = {
  //TypeOrmModuleOptions ?
  type: DB.type,
  database: DB.name,
  host: DB.host,
  port: DB.port,
  username: DB.username,
  password: DB.password,
  entities: [Users, Product, Order],
  synchronize: true, //znayu
};

export default TypeOrmModule.forRoot(CONFIG);
