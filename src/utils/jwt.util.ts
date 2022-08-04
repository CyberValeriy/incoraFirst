import { JWT as JWTConf } from "../config/application.config";
import { IJwtPayload } from "../interfaces/users.interfaces";
import jwt from "jsonwebtoken";

import { UnauthorizedException } from "@nestjs/common";

export const decodeToken = (token: string): IJwtPayload => {
  try {
    const payload = jwt.verify(token, JWTConf.access) as IJwtPayload;
    return payload;
  } catch (err) {
    throw new UnauthorizedException(err.message);
  }
};
