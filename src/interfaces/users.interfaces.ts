/* eslint-disable prettier/prettier */

import { Request } from "express";

export interface ICheckoutProducts {
  id: number;
  quantity: number;
}

export interface IAuthReq extends Request {
  userEmail: string;
}
