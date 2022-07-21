/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { UsersModule } from "./users/users.module";
import { ProductsModule } from "./products/products.module";
import { OrdersModule } from "./orders/orders.module";
import { ModifiersModule } from './modifiers/modifiers.module';

import typeOrmModule from "./db/db.module";

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [typeOrmModule, UsersModule, ProductsModule, OrdersModule, ModifiersModule],
})
export class AppModule {}
