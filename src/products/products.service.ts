/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from "@nestjs/common";

import { In, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  create(
    title: string,
    description: string,
    // productModifiers: string[],
    price: number
  ): Promise<Product> {
    try {
      const productInstance = this.repo.create({
        description,
        // productModifiers,
        title,
        price,
      });
      return this.repo.save(productInstance);
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  async remove(id: number) {
    const product = await this.repo.findOne({ where: { id } });
    this.isProductExists(product);
    try {
      return this.repo.remove(product);
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  async update(id: number, attrs: Partial<Product>): Promise<Product> {
    const product = await this.repo.findOne({ where: { id } });
    this.isProductExists(product);
    try {
      Object.assign(product, attrs);
      return this.repo.save(product);
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.repo.findOne({ where: { id } });
    this.isProductExists(product);
    try {
      return product;
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  async findMany(ids: number[]): Promise<Product[]> {
    try {
      const products = await this.repo.find({ where: { id: In(ids) } });
      return products;
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  private isProductExists(product: Product): void {
    if (!product) {
      throw new BadRequestException("Product not found!");
    }
  }

  /*
  Create service that allow get products exept products with users alergens
  Products join with modifiers relations and get user alergens ids
  Exclude by IN operator
  */
}
