/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Get,
  Req,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import {UsersService} from "../users/users.service";

import { CreateProductDto,AddModifierDto,UpdateProductDto} from "./dtos";
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthGuard } from "../guards/auth.guard";
import { IAuthReq } from "../interfaces/users.interfaces";

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags("Products")
@Controller("products")
export class ProductsController {
  constructor(private productService: ProductsService,
    private usersService:UsersService ) {}

  @Post("/create")
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ description: "Create product!" })
  async createProduct(@Body() body: CreateProductDto) {
    await this.productService.create(
      body.title,
      body.description,
      body.price
    );
    return { success: true };
  }
  
  @Post("/addModifier")
  @ApiBody({ type: AddModifierDto })
  async addAlergen(@Body() body:AddModifierDto){
    await this.productService.addModifier(body.productId,body.modifierId);
    return {success:true}
  }

  @Delete("/:id")
  @ApiParam({ name: "id", required: true })
  async removeProduct(@Param("id") id: string) {
    await this.productService.remove(parseInt(id));
    return { success: true };
  }

  @Patch("/:id")
  @ApiParam({ name: "id", required: true })
  @ApiBody({ type: UpdateProductDto })
  async updateProduct(@Param("id") id: string, @Body() body: UpdateProductDto) {
    await this.productService.update(parseInt(id), body);
    return { success: true };
  }



  @Get('/')
  async getProducts(@Req() req:IAuthReq){
  const {userEmail} = req;
  const alergensIds = await this.usersService.getAlergens(userEmail,true);
  const products = await this.productService.getProducts(alergensIds as number[]);
  return {success:true,data:products}
  }


}
