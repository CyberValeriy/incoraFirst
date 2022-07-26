/* eslint-disable prettier/prettier */

import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface ICheckoutProducts {
  id: number;
  quantity: number;
}

export interface IAuthReq extends Request {
  user: IJwtPayload;
}

export interface IJwtPayload extends JwtPayload {
  //how to name it
  email: string;
  id: number;
}
