/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { Product } from "../products/product.entity";
import { Users } from "../users/users.entity";

@Entity()
export class Modifier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @ManyToMany(() => Users)
  @JoinTable()
  users: Users[];
}
