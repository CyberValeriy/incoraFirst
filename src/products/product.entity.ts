/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  ManyToMany,
  JoinTable,
} from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column("text", { array: true })
  // @ManyToMany(() => ProductModifier)
  // @JoinTable()
  productModifiers: string[]; //Many To Many

  @Column()
  price: number;

  //logs
  @AfterInsert()
  logInsert() {
    console.log("Product insert triggered with id: " + this.id);
  }
}
