/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./users.entity";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    //add password hashing
    //add validators x2
    console.log(email, password);
    const hashedPassword = password;
    const userInstance = this.repo.create({ email, password: hashedPassword });
    return this.repo.save(userInstance);
  }
}
