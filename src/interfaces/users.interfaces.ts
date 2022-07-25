/* eslint-disable prettier/prettier */

import { Request } from "express";
import {Users} from "../users/users.entity";

export interface ICheckoutProducts {
  id: number;
  quantity: number;
}

export interface IAuthReq extends Request {
  user:Users
}
