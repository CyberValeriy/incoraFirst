import { IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddAlergenDto {
  @IsNumber()
  @ApiProperty({ type: Number, required: true })
  alergenId: number;
}
