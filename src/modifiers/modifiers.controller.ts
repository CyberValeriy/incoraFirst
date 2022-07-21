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
import {
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { AuthGuard } from "../guards/auth.guard";

@ApiTags("Modifiers")
@UseGuards(AuthGuard)
@Controller("modifiers")
export class ModifiersController {
  constructor(private modifierService: ModifiersService) {}

  @ApiBody({ type: CreateModifierDto })
  @ApiResponse({ description: "Create a modifier!" })
  @Post("/create")
  async create(@Body() body: CreateModifierDto) {
    const modifier = await this.modifierService.create(body.title);
    return { success: true, data: { modifier } };
  }

  @ApiParam({ name: "id" })
  @ApiResponse({ description: "Delete a modifier!" })
  @Delete("/:id")
  async delete(@Param("id") id: string) {
    await this.modifierService.delete(parseInt(id));
    return { success: true };
  }

  /* 
  How to not duplicate decorators?
  Can i create own decorator(wrapper for many decorators)
   */
  @ApiQuery({ name: "limit" })
  @ApiQuery({ name: "skip" })
  @ApiResponse({ description: "Get modifiers with pagination" })
  @Get("/")
  async fetch(@Query("skip") skip: string, @Query("limit") limit: string) {
    //how to add default like skip = 5 without using any?
    const modifiers = await this.modifierService.fetch(
      parseInt(skip),
      parseInt(limit)
    );
    return { success: true, data: { modifiers } };
  }
}
