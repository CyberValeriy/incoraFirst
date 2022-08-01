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
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";

import {
  CheckoutDto,
  CreateUserDto,
  SignInUserDto,
  AddAlergenDto,
} from "./dtos";
import { UsersService } from "./users.service";

import { AuthGuard } from "../guards/auth.guard";
import { IAuthReq } from "../interfaces/users.interfaces";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post("/signup")
  @ApiResponse({
    status: 201,
    description: "User authorization",
  })
  @ApiBody({ type: CreateUserDto })
  async signup(@Body() body: CreateUserDto) {
    const token = await this.userService.create(body.email, body.password);
    return { success: true, data: { token } };
  }

  @Post("/signin")
  @ApiResponse({
    status: 201,
    description: "User authentication",
  })
  async signin(@Body() body: SignInUserDto) {
    const token = await this.userService.signin(body.email, body.password);
    return { success: true, data: { token } };
  }

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
}

/* 
Add timestamps to the entities
*/
