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

  create(title: string): Promise<Modifier> {
    try {
      const modifierInstance = this.modifierRepo.create({ title });
      return this.modifierRepo.save(modifierInstance);
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  async delete(id: number): Promise<Modifier> {
    const modifier = await this.modifierRepo.findOne({ where: { id } });
    this.validateMOdifierExistence(modifier);

    try {
      return this.modifierRepo.remove(modifier);
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  fetch(skip: number, limit: number): Promise<Modifier[]> {
    try {
      return this.modifierRepo.find({ skip, take: limit });
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  async findOne(id: number): Promise<Modifier> {
    const modifier = await this.modifierRepo.findOne({ where: { id } });
    this.validateMOdifierExistence(modifier);
    return modifier;
  }

  private validateMOdifierExistence(modifier: Modifier): void {
    if (!modifier) {
      throw new BadRequestException("Modifier not found!");
    }
  }
}
