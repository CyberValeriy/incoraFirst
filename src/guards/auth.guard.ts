/* eslint-disable prettier/prettier */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";

import { authHeaderCheck } from "../utils/auth.util";

/*
Remake for User Instance, not payload object
Assign payload in req or deligate to controller User Instance
*/

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException("Authorization header missing!");
    }
    const payload = authHeaderCheck(authorization);
    return true;
  }
}
