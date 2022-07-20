/* eslint-disable */
import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";

import { TypeOrmModule } from "@nestjs/typeorm";

import { Users } from "./users.entity";
import { Product } from "../products/product.entity"; //or import from ProductModule?
import { ProductsModule } from "../products/products.module";
import { Order } from "../orders/order.entity";

import { UsersController } from "./users.controller";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([Users, Product, Order]), ProductsModule],
})
export class UsersModule {}
