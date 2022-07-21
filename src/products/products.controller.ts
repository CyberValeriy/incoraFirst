/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from "@nestjs/common";
import { ProductsService } from "./products.service";

//instead of import duplicate add index.ts in dtos with exports;
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { ApiBody, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthGuard } from "../guards/auth.guard";

@UseGuards(AuthGuard)
@ApiTags("Products")
@Controller("products")
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post("/create")
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ description: "Create product!" })
  async createProduct(@Body() body: CreateProductDto) {
    await this.productService.create(
      body.title,
      body.description,
      // body.productModifiers,
      body.price
    );
    return { success: true };
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
}
