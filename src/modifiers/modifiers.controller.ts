/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Param,
  Query,
  UseGuards,
} from "@nestjs/common";
import { CreateModifierDto } from "./dtos/create-modifier.dto";
import { ModifiersService } from "./modifiers.service";

import { AuthGuard } from "../guards/auth.guard";

@UseGuards(AuthGuard)
@Controller("modifiers")
export class ModifiersController {
  constructor(private modifierService: ModifiersService) {}

  @Post("/create")
  async create(@Body() body: CreateModifierDto) {
    const modifier = await this.modifierService.create(body.title);
    return { success: true, data: { modifier } };
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    await this.modifierService.delete(parseInt(id));
    return { success: true };
  }

  @Get("/")
  async fetch(@Query("skip") skip: string, @Query("limit") limit: string) {
    const modifiers = await this.modifierService.fetch(
      parseInt(skip),
      parseInt(limit)
    );
    return { success: true, data: { modifiers } };
  }
}
