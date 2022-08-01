/* eslint-disable prettier/prettier */
import { IsArray } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { ICheckoutProducts } from "../../interfaces/users.interfaces";

export class CheckoutDto {
  @IsArray()
  @ApiProperty({ type: Array, required: true })
  products: ICheckoutProducts[];
}
