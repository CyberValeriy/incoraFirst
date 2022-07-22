/* eslint-disable prettier/prettier */
import { IsString,IsOptional} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class GetAlergenDto {

  @IsOptional()
  @IsString()
  @ApiProperty({ type: Boolean, required: true })
  idsOnly: string;
}
