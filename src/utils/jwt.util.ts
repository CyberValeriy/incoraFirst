/* eslint-disable prettier/prettier */
import { JWT as JWTConf } from "../config/application.config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UnauthorizedException } from "@nestjs/common";

export const generateToken = (tokenPayload: JwtPayload): string => {
  const token: string = jwt.sign(tokenPayload, JWTConf.secret);
  return token;
};

export const decodeToken = (token: string): JwtPayload => {
  try {
    const payload = jwt.verify(token, JWTConf.secret) as JwtPayload;
    return payload;
  } catch (err) {
    return new UnauthorizedException(err.message);
  }
};
