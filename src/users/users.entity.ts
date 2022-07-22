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

import { Orders } from "../orders/order.entity";
import { Modifier } from "../modifiers/modifiers.entity";

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

  @ManyToMany(()=>Modifier)
  @JoinTable()
  alergens:Modifier[]

  //logs
  @AfterInsert()
  logInsert() {
    console.log("User insert triggered with id: " + this.id);
  }
}
