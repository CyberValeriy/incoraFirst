/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ModifiersController } from "./modifiers.controller";
import { ModifiersService } from "./modifiers.service";

import { TypeOrmModule } from "@nestjs/typeorm";
import { Modifier } from "./modifiers.entity";

@Module({
  controllers: [ModifiersController],
  providers: [ModifiersService],
  imports: [TypeOrmModule.forFeature([Modifier])],
  exports:[ModifiersService]
})
export class ModifiersModule {}
