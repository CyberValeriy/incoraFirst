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

import { Users } from "../users/users.entity";
import { Product } from "../products/product.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalPrice: number;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @ManyToOne(() => Users, (user) => user.orders)
  user: Users;

  //logs
  @AfterInsert()
  logInsert() {
    console.log("Order insert triggered with id: " + this.id);
  }
}
