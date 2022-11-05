import { Controller, UnauthorizedException } from "@nestjs/common";
import { Args, Context, Mutation, Query } from "@nestjs/graphql";

import { UsersInput } from "../users/dto/input/UsersInput.input";
import { User } from "../users/entities/users.entity";
import { AuthService, AuthenticatedUser } from "./auth.service";
import { GetUserInfo, LoginOutput } from "./dto/output";
import { isPublicResolver } from "./jwtStratedy.guard";

@Controller("auth")
export class AuthResolver {
  constructor(
    private readonly authService: AuthService // private readonly userService: UsersService
  ) {}

  @isPublicResolver()
  @Mutation(() => LoginOutput)
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

  @Mutation(() => LoginOutput)
  @isPublicResolver()
  async signin(@Args("user") userInput: UsersInput) {
    return this.authService.signin(userInput);
  }

  @Query(() => GetUserInfo)
  getUserInfo(@Context() context: any): GetUserInfo {
    return context.req.user;
  }
}
