/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  OneToMany,
} from "typeorm";

import { Orders } from "../orders/order.entity";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;

  @OneToMany(() => Orders, (order) => order.user)
  orders: Orders[];

  //logs
  @AfterInsert()
  logInsert() {
    console.log("User insert triggered with id: " + this.id);
  }
}
