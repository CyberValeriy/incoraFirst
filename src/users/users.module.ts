/* eslint-disable */
import { forwardRef, Global, Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";


import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersModule } from "../orders/orders.module";
import {ModifiersModule} from "../modifiers/modifiers.module";

import { Users } from "./users.entity";

/*
Is it right?
Or create other global module with imports from not-global modules?
*/
@Global()
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([Users]), forwardRef(()=> OrdersModule),ModifiersModule],
  exports:[UsersService]
})
export class UsersModule {}
