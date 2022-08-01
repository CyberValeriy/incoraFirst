/* eslint-disable prettier/prettier */
import { IsString, MinLength, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MinLength(4)
  @ApiProperty({ type: String, required: false })
  title: string;

  @IsOptional()
  @IsString()
  @MinLength(20)
  @ApiProperty({ type: String, required: false })
  description: string;
}
