/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from "@nestjs/common";
import {ModifiersService} from "../modifiers/modifiers.service";

import { In,  Not, Repository} from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productRepo: Repository<Product>,
  private mofifierService:ModifiersService) {}

  create(
    title: string,
    description: string,
    price: number
  ): Promise<Product> {
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

  async remove(id: number):Promise<Product>{
    const product = await this.productRepo.findOne({ where: { id } });
    this.isProductExists(product);
    try {
      return this.productRepo.remove(product);
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  async update(id: number, attrs: Partial<Product>): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id } });
    this.isProductExists(product);
    try {
      Object.assign(product, attrs);
      return this.productRepo.save(product);
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id } });
    this.isProductExists(product);
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
  async addModifier(modifierId:number,productId:number):Promise<Product>{
    const modifier = await this.mofifierService.findOne(modifierId);
    const product = await this.productRepo.findOne({where:{id:productId},relations:["productModifiers"]});
    product.productModifiers.push(modifier);
    return this.productRepo.save(product);
  }

  async getProducts(alergens:number[]):Promise<Product[]>{
/*
Fast way to fix is create default modifier - bad(maybe)
*/


    // const products = await this.productRepo.find({
    //   where:{productModifiers:{id:Not(In(alergens))}}, //how to fix products that don't have relations?
    //   relations:["productModifiers"],
    // });

    const products = await this.productRepo.createQueryBuilder("product").leftJoinAndSelect("product.productModifiers","pm",).where("pm.id NOT IN (:...ids) OR COALESCE(pm.id,0) = 0",{ids:alergens}).getMany();//i am a god
    return products;
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
