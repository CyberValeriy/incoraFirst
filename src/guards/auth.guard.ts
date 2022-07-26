/* eslint-disable prettier/prettier */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";

import { IAuthReq } from "../interfaces/users.interfaces";
import { authHeaderInfo } from "../utils/auth.util";

@Injectable()
export class AuthGuard implements CanActivate {


 async canActivate(
    context: ExecutionContext
  ) {
    const req: IAuthReq = context.switchToHttp().getRequest();
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException("Authorization header missing!");
    }

    req.user = authHeaderInfo(authorization);
    return true;
  }
}
