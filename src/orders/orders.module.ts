/* eslint-disable prettier/prettier */
import { forwardRef, Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
// import { OrdersController } from "./orders.controller";

import { TypeOrmModule } from "@nestjs/typeorm";
import { Orders } from "./order.entity";
import { OrderItem } from "./orderItems.entity";

import { ProductsModule } from "../products/products.module";

@Module({
  // controllers: [OrdersController],
  providers: [OrdersService],
  imports: [TypeOrmModule.forFeature([Orders, OrderItem]), forwardRef(()=>ProductsModule)],
  exports: [OrdersService],
})
export class OrdersModule {}
