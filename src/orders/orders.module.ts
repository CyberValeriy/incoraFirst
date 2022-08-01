import { forwardRef, Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";

import { TypeOrmModule } from "@nestjs/typeorm";
import { Orders } from "./order.entity";
import { OrderItem } from "./orderItem.entity";

import { ProductsModule } from "../products/products.module";

@Module({
  providers: [OrdersService],
  imports: [
    TypeOrmModule.forFeature([Orders, OrderItem]),
    forwardRef(() => ProductsModule),
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
