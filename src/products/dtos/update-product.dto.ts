/* eslint-disable prettier/prettier */
import { IsString, MinLength, IsArray, IsOptional } from "class-validator";

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MinLength(4)
  title: string;

  @IsOptional()
  @IsString()
  @MinLength(20)
  description: string;

  //   @IsArray()
  //   productModifiers: Array<string>;
}
