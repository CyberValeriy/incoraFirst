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
import { OrderItem } from "./orderItem.entity";

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    onDelete: "CASCADE",
  })
  orderItems: OrderItem[];

  @ManyToOne(() => Users)
  user: Users;

  @AfterInsert()
  logInsert() {
    console.log("Order insert triggered with id: " + this.id);
  }
}
