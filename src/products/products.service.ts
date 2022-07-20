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
    const productInstance = this.repo.create({
      description,
      // productModifiers,
      title,
      price,
    });
    return this.repo.save(productInstance);
  }

  async remove(id: number) {
    const product = await this.repo.findOne({ where: { id } });
    this.isProductExists(product);
    return this.repo.remove(product);
  }

  async update(id: number, attrs: Partial<Product>): Promise<Product> {
    const product = await this.repo.findOne({ where: { id } });
    this.isProductExists(product);
    Object.assign(product, attrs);
    return this.repo.save(product);
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.repo.findOne({ where: { id } });
    this.isProductExists(product);
    return product;
  }

  async findMany(ids: number[]): Promise<Product[]> {
    const products = await this.repo.find({ where: { id: In(ids) } });
    return products;
  }

  isProductExists(product: Product) {
    if (!product) {
      throw new BadRequestException("Product not found!");
    }
  }

  // isProductExists(products: Product[]) {
  //   if (!products) {
  //     throw new BadRequestException("Product not found!");
  //   }
  // }
}
