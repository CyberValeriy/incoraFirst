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
import {CreateModifierDto,FetchModifierDto} from "./dtos";
import { ModifiersService } from "./modifiers.service";
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { AuthGuard } from "../guards/auth.guard";

// @ApiBearerAuth()
@ApiTags("Modifiers")
// @UseGuards(AuthGuard)
@Controller("modifiers")
export class ModifiersController {
  constructor(private modifierService: ModifiersService) {}

  @Post("/create")
  @ApiBody({ type: CreateModifierDto })
  @ApiResponse({ description: "Create a modifier!" })
  async create(@Body() body: CreateModifierDto) {
    const modifier = await this.modifierService.create(body.title);
    return { success: true, data: { modifier } };
  }

  @Delete("/:id")
  @ApiParam({ name: "id" })
  @ApiResponse({ description: "Delete a modifier!" })
  async delete(@Param("id") id: string) {
    await this.modifierService.delete(parseInt(id));
    return { success: true };
  }

  @Get("/")
  @ApiResponse({ description: "Get modifiers with pagination" })
  async fetch(@Query() query:FetchModifierDto) {
    const modifiers = await this.modifierService.fetch(
      query.skip,
      query.limit
    );
    return { success: true, data: { modifiers } };
  }
}
