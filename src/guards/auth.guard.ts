/* eslint-disable prettier/prettier */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";

import { Observable } from "rxjs";
import { IAuthReq } from "../interfaces/users.interfaces";
import { authHeaderInfo } from "../utils/auth.util";

/*
How to make service to exec in guard
Or create decorator for user extracting?
*/

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: IAuthReq = context.switchToHttp().getRequest();
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException("Authorization header missing!");
    }

    const payload = authHeaderInfo(authorization);
    req.userEmail = payload.email;
    return true;
  }
}
