/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UseGuards, Req, Get, Delete,Param, Query} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CheckoutDto, CreateUserDto, SignInUserDto,AddAlergenDto,GetAlergenDto} from "./dtos";
import { UsersService } from "./users.service";

import { AuthGuard } from "../guards/auth.guard";
import { IAuthReq } from "../interfaces/users.interfaces";

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
  @ApiBody({type:CheckoutDto})
  @ApiResponse({ status: 201, description: "Create order with products" })
  async checkout(@Req() req: IAuthReq, @Body() payload: CheckoutDto) {
    const userEmail = req.userEmail;
    const user = await this.userService.findOne(userEmail);
    const order = await this.userService.checkout(user, payload.products);
    return { success: true, payload: { orderId: order.id } };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post("/addAlergen")
  @ApiBody({ type: AddAlergenDto })
  async addAlergen(@Req() req:IAuthReq,@Body() body:AddAlergenDto){
    await this.userService.addAlergen(req.userEmail,body.alergenId);
    return {success:true}
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete("/alergen/:id")
  async deleteAlergen(@Req() req:IAuthReq, @Param('id') id:string){
    const {userEmail} = req;
    await this.userService.deleteAlergen(userEmail,parseInt(id));
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get("/getAlergens")
  @ApiQuery({name:"idsOnly"})
  async test(@Req() req: IAuthReq,@Query() query:GetAlergenDto){

   const {userEmail} = req;
   const idsOnlyParsed = query?.idsOnly == "true" ? true : false;

   const alergens = await this.userService.getAlergens(userEmail,idsOnlyParsed);
   return {success:true,data:{alergens}}
  }
}

/* 
Add timestamps to the entities
*/
