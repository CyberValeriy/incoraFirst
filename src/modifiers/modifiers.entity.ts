/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert } from "typeorm";

@Entity()
export class Modifier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @AfterInsert()
  logInsert() {
    console.log("Modifier insert triggered with id: " + this.id);
  }
}
