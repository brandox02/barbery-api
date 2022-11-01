import { Controller, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Args, Query } from "@nestjs/graphql";

import { UsersInput } from "../users/dto/input/UsersInput.dto";
import { AuthService } from "./auth.service";
import { LoginOutput } from "./dto/output";
import { isPublicResolver, JwtGraphqlStrategyGuard } from "./jwtStratedy.guard";
@Controller("auth")
export class AuthResolver {
  constructor(
    private readonly authService: AuthService // private readonly userService: UsersService
  ) {}

  @isPublicResolver()
  @Query(() => LoginOutput)
  async login(
    @Args("username") username: string,
    @Args("password") password: string
  ) {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    const response = this.authService.login(user);

    return response;
  }

  @Query(() => LoginOutput)
  @UseGuards(JwtGraphqlStrategyGuard)
  async signin(@Args("user") userInput: UsersInput) {
    return this.authService.signin(userInput);
  }
}
