import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LogInUserDto {
  @IsEmail()
  @ApiProperty({ type: String, required: true })
  email: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  password: string;
}
