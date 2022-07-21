/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateModifierDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  title: string;
}
