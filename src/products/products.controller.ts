/* eslint-disable prettier/prettier */
import { Controller, Post, Patch, Delete, Param, Body } from "@nestjs/common";
import { ProductsService } from "./products.service";

//instead of import duplicate add index.ts in dtos with exports;
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";

@Controller("products")
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post("/create")
  createProduct(@Body() body: CreateProductDto) {
    this.productService.create(
      body.title,
      body.description,
      body.productModifiers
    );
  }

  @Delete("/:id")
  removeProduct(@Param("id") id: string) {
    this.productService.remove(parseInt(id));
  }

  @Patch("/:id")
  updateProduct(@Param("id") id: string, @Body() body: UpdateProductDto) {
    this.productService.update(parseInt(id), body);
  }
}
