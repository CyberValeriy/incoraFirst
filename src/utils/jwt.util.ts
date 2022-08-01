import { JWT as JWTConf } from "../config/application.config";
import { IJwtPayload } from "../interfaces/users.interfaces";
import jwt from "jsonwebtoken";

import { UnauthorizedException } from "@nestjs/common";

export const generateToken = (tokenPayload: IJwtPayload): string => {
  const token: string = jwt.sign(tokenPayload, JWTConf.secret);
  return token;
};

export const decodeToken = (token: string): IJwtPayload => {
  try {
    const payload = jwt.verify(token, JWTConf.secret) as IJwtPayload;
    return payload;
  } catch (err) {
    throw new UnauthorizedException(err.message);
  }
};
