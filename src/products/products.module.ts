import { forwardRef, Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";

import { TypeOrmModule } from "@nestjs/typeorm";
import { ModifiersModule } from "../modifiers/modifiers.module";
import { UsersModule } from "../users/users.module";
import { Product } from "./product.entity";

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([Product]),
    ModifiersModule,
    forwardRef(() => UsersModule),
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
