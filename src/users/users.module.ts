/* eslint-disable */
import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";

import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";

import { UsersController } from "./users.controller";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
