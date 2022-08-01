/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { OrderItem } from "../orders/orderItem.entity";
import { Modifier } from "../modifiers/modifiers.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @ManyToMany(() => Modifier)
  @JoinTable()
  productModifiers: Modifier[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  @AfterInsert()
  logInsert() {
    console.log("Product insert triggered with id: " + this.id);
  }
}
