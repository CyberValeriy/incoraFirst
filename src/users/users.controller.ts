/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CheckoutDto, CreateUserDto, SignInUserDto } from "./dtos";
import { UsersService } from "./users.service";
import { Users } from "./users.entity";

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

  // @Post("/checkout")
  // @ApiResponse({ status: 201, description: "Create order with products" })
  // add token check
  // async checkout(@Body() payload: CheckoutDto) {
  //   //add timestamps
  //   const user: Users = {}; //for test
  //   const order = await this.userService.checkout(user, payload.products);
  //   return { success: true, payload: { orderId: order.id } };
  // }

  @Get("/test")
  async testFunc() {
    this.userService.testFunc();
  }
}
