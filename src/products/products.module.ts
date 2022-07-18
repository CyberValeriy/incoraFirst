/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";

import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./product.entity";

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([Product])],
})
export class ProductsModule {}
