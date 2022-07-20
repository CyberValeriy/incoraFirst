/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";

import { Product } from "../products/product.entity";
import { Order } from "../orders/order.entity";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Order)
  order: Order;

  @ManyToOne(() => Product)
  product: Product;

  //logs
  @AfterInsert()
  logInsert() {
    console.log("OrderItem insert triggered with id: " + this.id);
  }
}
