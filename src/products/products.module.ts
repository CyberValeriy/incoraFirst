/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";

import { TypeOrmModule } from "@nestjs/typeorm";
import {ModifiersModule} from "../modifiers/modifiers.module";
import { Product } from "./product.entity";

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [TypeOrmModule.forFeature([Product]),ModifiersModule],
  exports: [ProductsService],
})
export class ProductsModule {}
