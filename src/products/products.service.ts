/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";

import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  create(title: string, description: string, productModifiers: string[]) {
    const productInstance = this.repo.create({
      description,
      productModifiers,
      title,
    });
    return this.repo.save(productInstance);
  }

  async remove(id: number) {
    const product = await this.repo.findOne({ where: { id } });
    //add custom err from Nest
    if (!product) {
      throw new Error("Product not found!");
    }
    return this.repo.remove(product);
  }

  async update(id: number, attrs: Partial<Product>) {
    const product = await this.repo.findOne({ where: { id } });
    //add custom err from Nest
    if (!product) {
      throw new Error("Product not found!");
    }
    Object.assign(product, attrs);
    return this.repo.save(product);
  }
}

/*
TASKS:
Add Create✓
Add Remove✓
Add Update✓
Add Get

Remove user check, setup interceptors
Create single method for findOne instead of code duplication
*/
