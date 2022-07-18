/* eslint-disable prettier/prettier */
import { IsString, MinLength, IsArray, IsNumber } from "class-validator";

export class CreateProductDto {
  @IsString()
  @MinLength(4)
  title: string;

  @IsString()
  @MinLength(20)
  description: string;

  @IsNumber()
  price: number;

  @IsArray()
  productModifiers: Array<string>;
}
