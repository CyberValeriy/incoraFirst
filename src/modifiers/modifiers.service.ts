/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Modifier } from "./modifiers.entity";

@Injectable()
export class ModifiersService {
  constructor(
    @InjectRepository(Modifier) private modifierRepo: Repository<Modifier>
  ) {}

  create(title: string) {
    try {
      const modifierInstance = this.modifierRepo.create({ title });
      return this.modifierRepo.save(modifierInstance);
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  async delete(id: number) {
    const modifier = await this.modifierRepo.findOne({ where: { id } });
    this.isModifierExists(modifier);

    return this.modifierRepo.remove(modifier);
  }

  fetch(skip: number, limit: number) {
    return this.modifierRepo.find({ skip, take: limit });
  }

  isModifierExists(modifier: Modifier) {
    //create global func
    if (!modifier) {
      throw new BadRequestException("Modifier not found!");
    }
  }
}
