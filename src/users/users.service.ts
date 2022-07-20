/* eslint-disable prettier/prettier */
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Users } from "./users.entity";

import { OrdersService } from "../orders/orders.service";

import { generateToken } from "../utils/jwt.util";
import bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepo: Repository<Users>,
    private ordersService: OrdersService
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
    const token = generateToken({ email });
    await this.usersRepo.save(userInstance);
    return token;
  }

  async signin(email: string, password: string) {
    const user = await this.usersRepo.findOne({ where: { email } });
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (!passwordIsCorrect) {
      throw new UnauthorizedException("Invalid password!");
    }
    const token = generateToken({ email });
    return token;
  }

  async checkout(user, products) {
    //user from midleware/guard
    const order = await this.ordersService.create(user);
    await this.ordersService.createItems(order, products);
    return order;
  }
}
