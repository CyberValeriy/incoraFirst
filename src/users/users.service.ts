/* eslint-disable prettier/prettier */
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Not, Repository } from "typeorm";

import { Users } from "./users.entity";

import { OrdersService } from "../orders/orders.service";

import { generateToken } from "../utils/jwt.util";

import { ICheckoutProducts } from "../interfaces/users.interfaces";
import bcrypt from "bcrypt";
import { Orders } from "src/orders/order.entity";

/*How to not block errors with try? */

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepo: Repository<Users>,
    private ordersService: OrdersService
  ) {}

  async create(email: string, password: string): Promise<string> {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (user) {
      throw new BadRequestException("Email already claimed!");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const userInstance = this.usersRepo.create({
      email,
      password: hashedPassword,
    });
    const token = generateToken({ email });
    await this.usersRepo.save(userInstance);
    return token;
  }

  async signin(email: string, password: string): Promise<string> {
    const user = await this.usersRepo.findOne({ where: { email } });
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (!passwordIsCorrect) {
      throw new UnauthorizedException("Invalid password!");
    }
    const token = generateToken({ email });
    return token;
  }

  async checkout(user: Users, products: ICheckoutProducts[]): Promise<Orders> {
    try {
      const order = await this.ordersService.create(user);
      await this.ordersService.createItems(order, products);
      return order;
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  async findOne(email: string): Promise<Users> {
    const user = await this.usersRepo.findOne({ where: { email } });
    this.isUserExists(user);
    return user;
  }

  private isUserExists(user: Users): void {
    if (!user) {
      throw new BadRequestException("User not found!");
    }
  }
  // async testFunc() {
  //   const users = await this.usersRepo.findOne({
  //     where: { id: 1 },
  //     relations: ["orders"],
  //   });
  //   const order = users.orders[0];
  //   console.log(order);
  //   //just get array of user alergen ids and exlude?
  //   const test = await this.usersRepo.findOne({
  //     where: { id: 1, orders: { id: Not(1) } },
  //     relations: ["orders"],
  //   });
  //   console.log(test);
  // }
}
