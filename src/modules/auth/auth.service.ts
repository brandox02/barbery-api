import { Injectable } from "@nestjs/common";
import { User } from "src/modules/users/entities/users.entity";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { ResourceExistsException } from "src/GqlExeptions/ResourceExistsException";

export type AuthenticatedUser = Omit<User, "password">;
export type LoginOutput = { accessToken: string };
export type JwtPayload = { username: string; sub: number };

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @InjectDataSource() private readonly dataSource: DataSource
  ) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<AuthenticatedUser | null> {
    const user = await this.userService.findOne({ username });
    if (user && user.password === password) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  private getToken(user: AuthenticatedUser) {
    const payload: JwtPayload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
    };
  }

  login(user: AuthenticatedUser): LoginOutput {
    const token = this.getToken(user);
    return token;
  }

  async signin(userInput: User) {
    const { username, email, password } = userInput;
    const userRepo = this.dataSource.getRepository(User);
    const userFound = await userRepo
      .createQueryBuilder("user")
      .select("user")
      .where(
        "(user.email = :email or user.username = :username) and user.password = :password",
        { email, username, password }
      )
      .getOne();

    if (userFound) {
      throw ResourceExistsException("user");
    }

    const user = await userRepo.save(userRepo.create(userInput));

    console.log(user);
  }
}
