/* eslint-disable prettier/prettier */
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "./users.entity";
import { Product } from "../products/product.entity";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { JWT } from "../config";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepo: Repository<Users>,
    @InjectRepository(Product) private productRepo: Repository<Product>
  ) {}

  async create(email: string, password: string) {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (user) {
      throw new BadRequestException("Email already claimed!");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const userInstance = this.usersRepo.create({
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({}, JWT.secret, { subject: userInstance.email });
    await this.usersRepo.save(userInstance);
    return token;
  }

  async signin(email: string, password: string) {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException("Invalid password!");
    }
    const token = jwt.sign({}, JWT.secret, { subject: user.email });
    console.log(user);
    return token;
  }

  async addToCart(id: number, user_id: number) {
    const product = await this.productRepo.findOne({ where: { id } }); //how to do a relation check
    if (!product) {
    }
    const user = await this.usersRepo.findOne({ where: { id: user_id } });
    user.products.push(product.id);
    return this.usersRepo.save(user);
  }
}
