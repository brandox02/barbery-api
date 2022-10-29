import { Controller, Req, UseGuards } from "@nestjs/common";
import { Args, Query } from "@nestjs/graphql";
import { Request } from "src/common/types";
import { UsersInput } from "../users/dto/input";
import { AuthService } from "./auth.service";
import { LocalStrategyGuard } from "./localStrategy.guard";

@Controller("auth")
export class AuthRsolver {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(LocalStrategyGuard)
  // @Post("login")
  // login(@Req() req: Request) {
  //   const response = this.authService.login(req.user);

  //   return response;
  // }

  @Query(() => String)
  @UseGuards(LocalStrategyGuard)
  login(@Req() req: Request) {
    const response = this.authService.login(req.user);

    return response;
  }

  @Query(() => String)
  signin(@Args("user") userInput: UsersInput) {
    console.log({ userInput });
    return "";
  }
}
