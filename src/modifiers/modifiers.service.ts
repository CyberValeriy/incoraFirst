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

    try {
      return this.modifierRepo.remove(modifier);
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  fetch(skip: number, limit: number) {
    try {
      return this.modifierRepo.find({ skip, take: limit });
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  isModifierExists(modifier: Modifier) {
    //create global func
    if (!modifier) {
      throw new BadRequestException("Modifier not found!");
    }
  }
}
