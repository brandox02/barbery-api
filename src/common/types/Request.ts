import { Request as ExpressRequest } from "express";
import { AuthenticatedUser } from "src/modules/auth/auth.service";

export interface Request extends ExpressRequest {
  user: AuthenticatedUser;
}
