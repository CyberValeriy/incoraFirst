/* eslint-disable prettier/prettier */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";

import {UsersService} from "../users/users.service";

import { IAuthReq } from "../interfaces/users.interfaces";
import { authHeaderInfo } from "../utils/auth.util";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private usersService:UsersService ){}

 async canActivate(
    context: ExecutionContext
  ) {
    const req: IAuthReq = context.switchToHttp().getRequest();
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException("Authorization header missing!");
    }

    const payload = authHeaderInfo(authorization);
    req.user = await this.usersService.findOne(payload.userEmail);
    return true;
  }
}
