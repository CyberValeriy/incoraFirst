/* eslint-disable */
import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";

import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./users.entity";

import { UsersController } from "./users.controller";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([Users])],
})
export class UsersModule {}
