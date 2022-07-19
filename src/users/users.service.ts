/* eslint-disable prettier/prettier */
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "./users.entity";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { JWT } from "../config";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private repo: Repository<Users>) {}

  async create(email: string, password: string) {
    const user = await this.repo.findOne({ where: { email } });
    if (user) {
      throw new BadRequestException("Email already claimed!");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const userInstance = this.repo.create({
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({}, JWT.secret, { subject: userInstance.email });
    await this.repo.save(userInstance);
    return token;
  }

  async signin(email: string, password: string) {
    const user = await this.repo.findOne({ where: { email } });
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException("Invalid password!");
    }
    const token = jwt.sign({}, JWT.secret, { subject: user.email });
    return token;
  }
}
