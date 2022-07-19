/* eslint-disable prettier/prettier */
import { IsString, MinLength, IsArray, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @IsString()
  @MinLength(4)
  @ApiProperty({ type: String, required: true, minLength: 4 })
  title: string;

  @IsString()
  @MinLength(20)
  @ApiProperty({ type: String, required: true, minLength: 20 })
  description: string;

  @IsNumber()
  @ApiProperty({ type: Number, required: true })
  price: number;

  @IsArray()
  @ApiProperty({ type: Array, required: true })
  productModifiers: Array<string>;
}
