/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  AfterInsert,
  OneToMany,
  ManyToOne,
  Column,
} from "typeorm";

import { Users } from "../users/users.entity";
import { OrderItem } from "../orders/orderItems.entity";

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    onDelete: "CASCADE",
  })
  orderItems: OrderItem[];

  @Column()
  userId: number;

  @ManyToOne(() => Users)
  user: Users;

  //logs
  @AfterInsert()
  logInsert() {
    console.log("Order insert triggered with id: " + this.id);
  }
}
