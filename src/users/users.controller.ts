/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Body } from "@nestjs/common";

import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post("/signup")
  signup(@Body() body: CreateUserDto) {
    this.userService.create(body.email, body.password);
    return { success: true };
  }
}
