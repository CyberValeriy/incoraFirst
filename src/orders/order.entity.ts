/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  // ManyToOne,
} from "typeorm";

// import { User } from "../users/users.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => User, { onDelete: "CASCADE" }) // reverse?
  // user: User;

  @Column()
  totalPrice: number;

  //   @Column("number", { array: true }) must be a key ?
  //   products: number[];

  //logs
  @AfterInsert()
  logInsert() {
    console.log("Order insert triggered with id: " + this.id);
  }
}
