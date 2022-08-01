/* eslint-disable prettier/prettier */
import { IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { Optional } from "@nestjs/common";

export class FetchModifierDto {
  @ApiProperty({ type: Number })
  @Optional()
  @Type(() => Number)
  @IsNumber()
  skip: number;

  @ApiProperty({ type: Number })
  @Optional()
  @Type(() => Number)
  @IsNumber()
  limit: number;

  constructor(skip = 0, limit = 20) {
    this.skip = skip;
    this.limit = limit;
  }
}
