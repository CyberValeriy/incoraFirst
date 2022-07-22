/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FetchModifierDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  skip: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  limit:string;
}
