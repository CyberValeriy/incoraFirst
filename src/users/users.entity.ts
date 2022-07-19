/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  OneToMany,
} from "typeorm";

import { Order } from "../orders/order.entity";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;

  @Column("int", { array: true, default: [] }) //no need a relation?
  products: number[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  //logs
  @AfterInsert()
  logInsert() {
    console.log("User insert triggered with id: " + this.id);
  }
}
