import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Delete,
  Param,
} from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";

import {
  CheckoutDto,
  AddAlergenDto,
  CreateUserDto,
  LogInUserDto,
} from "./dtos";
import { UsersService } from "./users.service";

import { AuthGuard } from "../guards/auth.guard";
import { IAuthReq } from "../interfaces/users.interfaces";
import { MessagePattern } from "@nestjs/microservices";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post("/checkout")
  @ApiResponse({ status: 201, description: "Create order with products" })
  async checkout(@Req() req: IAuthReq, @Body() payload: CheckoutDto) {
    const { email } = req.user;
    const user = await this.userService.findOne(email);
    const order = await this.userService.checkout(user, payload.products);
    await this.userService.sendEmail({
      orderId: order.id,
      email,
    });
    return { success: true, payload: { orderId: order.id } };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post("/addAlergen")
  async addAlergen(@Req() req: IAuthReq, @Body() body: AddAlergenDto) {
    const { email } = req.user;
    await this.userService.addAlergen(email, body.alergenId);
    return { success: true };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete("/alergen/:id")
  async deleteAlergen(@Req() req: IAuthReq, @Param("id") id: string) {
    const { email } = req.user;
    await this.userService.deleteAlergen(email, parseInt(id));
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get("/getAlergens")
  async getAlergens(@Req() req: IAuthReq) {
    const { email } = req.user;

    const alergens = await this.userService.getAlergens(email);
    return { success: true, data: { alergens } };
  }

  @Get("/testEmail")
  async test() {
    await this.userService.sendEmail({
      orderId: 1,
      email: "validoks@gmail.com",
    });
    return 0;
  }

  /*
  Heartbeat func if slow calculations
  */

  @MessagePattern("signup_user")
  async signup(data: CreateUserDto) {
    // is dto gonna check kafka data?
    const user = await this.userService.create(data.email, data.password);
    return user;
  }

  @MessagePattern("login_user")
  async login(data: LogInUserDto) {
    const user = await this.userService.login(data.email, data.password);
    return user;
  }
}

/* 
Add timestamps to the entities
*/
