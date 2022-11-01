import { Injectable } from "@nestjs/common";
import { User } from "src/modules/users/entities/users.entity";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { ResourceExistsException } from "src/GqlExeptions/ResourceExistsException";
import { UsersInput } from "../users/dto/input";
import { omit } from "lodash";

export type AuthenticatedUser = Omit<UsersInput, "password">;
export type LoginOutput = { accessToken: string };
export type JwtPayload = { username: string; sub: number };

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @InjectDataSource() private readonly dataSource: DataSource // @Inject(forwardRef(() => UsersService)) // private readonly userService: UsersService
  ) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<AuthenticatedUser | null> {
    const user = await this.userService.findOne({ username });
    if (user && user.password === password) {
      const userPicked = omit(user, "password");
      return userPicked;
    }
    return null;
  }

  getToken(user: AuthenticatedUser) {
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

  async signin(userInput: UsersInput) {
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

    const response = this.login(user);
    return response;
  }
}
