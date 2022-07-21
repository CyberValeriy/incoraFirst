/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty } from "class-validator";

export class CreateModifierDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
