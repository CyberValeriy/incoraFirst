/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  AfterInsert,
  OneToMany,
  ManyToOne,
} from "typeorm";

import { Users } from "../users/users.entity";
import { OrderItem } from "../orders/orderItems.entity";

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @ManyToOne(() => Users)
  user: Users;

  //logs
  @AfterInsert()
  logInsert() {
    console.log("Order insert triggered with id: " + this.id);
  }
}
