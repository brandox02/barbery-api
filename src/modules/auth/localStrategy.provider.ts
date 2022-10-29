import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthenticatedUser, AuthService } from "./auth.service";

@Injectable()
export class LocalStrategyProvider extends PassportStrategy(Strategy) {
  @Inject(AuthService)
  private readonly authService: AuthService;

  async validate(
    username: string,
    password: string
  ): Promise<AuthenticatedUser> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
