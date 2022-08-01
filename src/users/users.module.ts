/* eslint-disable */
import { forwardRef, Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersModule } from "../orders/orders.module";
import { ModifiersModule } from "../modifiers/modifiers.module";

import { ClientsModule, Transport } from "@nestjs/microservices";

import { Users } from "./users.entity";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    ClientsModule.register([
      {
        name: "KafkaClient",
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ["localhost:29092"],
            clientId: "monolith",
          },
          producer: {
            allowAutoTopicCreation: false,
          },
        },
      },
    ]),
    TypeOrmModule.forFeature([Users]),
    forwardRef(() => OrdersModule),
    ModifiersModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
