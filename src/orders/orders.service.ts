/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from "@nestjs/common";

import { Product } from "../products/product.entity";
import { OrderItem } from "./orderItem.entity";
import { Users } from "../users/users.entity";
import { Orders } from "./order.entity";

import { ProductsService } from "../products/products.service";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders) private orderRepo: Repository<Orders>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    private productService: ProductsService
  ) {}

  async create(user: Users): Promise<Orders> {
    try {
      const order = this.orderRepo.create({
        user,
      });
      return this.orderRepo.save(order);
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  async createItems(
    order: Orders,
    products: { id: number; quantity: number }[]
  ): Promise<void> {
    const productIds = products.map(({ id }) => id);

    const productInstances: Product[] = await this.productService.findMany(
      productIds
    );

    if (productInstances.length !== products.length) {
      throw new BadRequestException("Invalid product id!");
    }
    try {
      const orderItemsInstances = [];
      for (let i = 0; i < productInstances.length; i++) {
        const orderItem = this.orderItemRepo.create({
          product: productInstances[i],
          order,
          quantity: products[i].quantity,
        });
        orderItemsInstances.push(orderItem);
      }
      await this.orderItemRepo.save(orderItemsInstances);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
