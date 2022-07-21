/* eslint-disable prettier/prettier */
import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { decodeToken } from "./jwt.util";

export const authHeaderCheck = (header: string) => {
  try {
    const token = header.split(" ")[1];
    if (!token) {
      throw new UnauthorizedException("Invalid token or missing!");
    }
    const payload = decodeToken(token);
    return payload;
  } catch ({ message }) {
    throw new BadRequestException("Authorization header check fail!");
  }
};
