/* eslint-disable prettier/prettier */
import { IsString, MinLength, IsArray } from "class-validator";

export class CreateProductDto {
  @IsString()
  @MinLength(4)
  title: string;

  @IsString()
  @MinLength(20)
  description: string;

  @IsArray()
  productModifiers: Array<string>;
}
