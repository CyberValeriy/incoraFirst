/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  OneToMany,
} from "typeorm";

import { OrderItem } from "../orders/orderItems.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  // @ManyToMany(() => ProductModifier)
  // @JoinTable()
  // productModifiers: string[]; //Many To Many

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  @Column()
  orderItems: OrderItem[];

  //logs
  @AfterInsert()
  logInsert() {
    console.log("Product insert triggered with id: " + this.id);
  }
}
