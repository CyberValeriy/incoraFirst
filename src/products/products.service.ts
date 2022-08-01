import { BadRequestException, Injectable } from "@nestjs/common";
import { ModifiersService } from "../modifiers/modifiers.service";

import { In, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private mofifierService: ModifiersService
  ) {}

  create(title: string, description: string, price: number): Promise<Product> {
    try {
      const productInstance = this.productRepo.create({
        description,
        title,
        price,
      });
      return this.productRepo.save(productInstance);
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  async remove(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id } });
    this.validateProductExistence(product);
    try {
      return this.productRepo.remove(product);
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  async update(id: number, attrs: Partial<Product>): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id } });
    this.validateProductExistence(product);
    try {
      Object.assign(product, attrs);
      return this.productRepo.save(product);
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id } });
    this.validateProductExistence(product);
    try {
      return product;
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  async findMany(ids: number[]): Promise<Product[]> {
    try {
      const products = await this.productRepo.find({ where: { id: In(ids) } });
      return products;
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  /*
  Remake for method not a repo findOne
  */
  async addModifier(modifierId: number, productId: number): Promise<Product> {
    const modifier = await this.mofifierService.findOne(modifierId);
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ["productModifiers"],
    });
    product.productModifiers.push(modifier);
    return this.productRepo.save(product);
  }

  async getProducts(userId: number): Promise<Product[]> {
    //first try
    const products = await this.productRepo.query(`
    WITH alergens AS (
      SELECT
        "modifierId"
      FROM
        users_alergens_modifier
      WHERE
        "usersId" = ${userId}
    )
    
    
    SELECT
      product.id,
      product.title,
      ARRAY_AGG(row_to_json(modifier)) AS modifiers
    FROM
      product
      LEFT JOIN product_product_modifiers_modifier as productmodifiers ON productmodifiers."productId" = product.id
      LEFT JOIN modifier ON modifier.id = productmodifiers."modifierId"
    WHERE
      "modifierId" NOT IN (SELECT * FROM alergens) OR "modifierId" IS NULL
    GROUP BY
      product.id;
    `);
    return products;
  }

  private validateProductExistence(product: Product): void {
    if (!product) {
      throw new BadRequestException("Product not found!");
    }
  }
}
