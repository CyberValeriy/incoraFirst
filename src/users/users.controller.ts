/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Param } from "@nestjs/common";

import { CreateUserDto } from "./dtos/create-user.dto"; //index.ts
import { SignInUserDto } from "./dtos/singin-user.dto";

import { UsersService } from "./users.service";

import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post("/signup")
  @ApiResponse({
    status: 201,
    description: "User authorization",
  })
  @ApiBody({ type: CreateUserDto })
  async signup(@Body() body: CreateUserDto) {
    const token = await this.userService.create(body.email, body.password);
    return { success: true, payload: { token } };
  }

  @Post("/signin")
  @ApiResponse({
    status: 201,
    description: "User authentication",
  })
  async signin(@Body() body: SignInUserDto) {
    const token = await this.userService.signin(body.email, body.password);
    return { success: true, payload: { token } };
  }

  // @Post("/checkout") //or Put?
  //add token check
  // async checkout() {}
}
