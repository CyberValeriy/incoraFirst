/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";

import { Order } from "./order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}

  // create
}
