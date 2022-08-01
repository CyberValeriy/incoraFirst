import { IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddModifierDto {
  @IsNumber()
  @ApiProperty({ type: Number, required: true })
  productId: number;

  @IsNumber()
  @ApiProperty({ type: Number, required: true })
  modifierId: number;
}
