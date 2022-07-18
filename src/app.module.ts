/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersModule } from "./users/users.module";
import { ProductsModule } from "./products/products.module";
import { OrdersModule } from "./orders/orders.module";

import { User } from "./users/users.entity";
import { Product } from "./products/product.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      database: "incora",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "superval",
      entities: [User, Product],
      synchronize: true, //znayu
    }),
    UsersModule,
    ProductsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
