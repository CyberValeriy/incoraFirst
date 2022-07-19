/* eslint-disable */
import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";

import { TypeOrmModule } from "@nestjs/typeorm";

import { Users } from "./users.entity";
import { Product } from "../products/product.entity"; //or import from ProductModule?

import { UsersController } from "./users.controller";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([Users, Product])],
})
export class UsersModule {}
