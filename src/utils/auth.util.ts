import { UnauthorizedException } from "@nestjs/common";
import { decodeToken } from "./jwt.util";

export const authHeaderInfo = (header: string) => {
  const token = header.split(" ")[1];
  if (!token) {
    throw new UnauthorizedException("Invalid token or missing!");
  }
  const payload = decodeToken(token);
  return payload;
};
