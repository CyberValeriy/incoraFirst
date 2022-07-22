/* eslint-disable */
import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";


import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersModule } from "../orders/orders.module";
import {ModifiersModule} from "../modifiers/modifiers.module";

import { Users } from "./users.entity";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([Users]), OrdersModule,ModifiersModule],
})
export class UsersModule {}
