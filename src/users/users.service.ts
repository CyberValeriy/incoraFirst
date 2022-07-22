/* eslint-disable prettier/prettier */
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository} from "@nestjs/typeorm";
import { In, Not, Repository} from "typeorm";

import { ICheckoutProducts } from "../interfaces/users.interfaces";

import { Users } from "./users.entity";
import { Orders } from "src/orders/order.entity";

import { OrdersService } from "../orders/orders.service";
import {ModifiersService} from "../modifiers/modifiers.service";


import { generateToken } from "../utils/jwt.util";
import bcrypt from "bcrypt";
import { Modifier } from "src/modifiers/modifiers.entity";


/*How to not block errors with try? */

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepo: Repository<Users>,
    private ordersService: OrdersService,
    private modifiersService:ModifiersService
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

  /*
  Remake ffindOne or using user with relations not userId
  */
  async addAlergen(userEmail:string,alergenId:number):Promise<Users>{
    const user = await this.usersRepo.findOne({where:{email:userEmail},relations:["alergens"]});
    const alergen = await this.modifiersService.findOne(alergenId);
    user.alergens.push(alergen);
    return this.usersRepo.save(user);
  }

  async deleteAlergen(userEmail:string,alergenId:number):Promise<Users>{
  const user = await this.usersRepo.findOne({where:{email:userEmail}});
  user.alergens.filter(({id}) => id != alergenId); //Like in Doc, but is it fast?
  return this.usersRepo.save(user);
  }

  async getAlergens(userEmail:string,idsOnly:boolean):Promise<number[]| Modifier[]>{
    const {alergens} = await this.usersRepo.findOne({where:{email:userEmail},relations:["alergens"],loadRelationIds:idsOnly});
    return alergens;
  }
}
