/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;

  //logs
  @AfterInsert()
  logInsert() {
    console.log("User insert triggered with id: " + this.id);
  }
}
