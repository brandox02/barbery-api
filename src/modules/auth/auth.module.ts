import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { AuthService } from "./auth.service";
import { LocalStrategyProvider } from "./localStrategy.provider";
import { JwtModule } from "@nestjs/jwt";
import { AuthRsolver } from "./auth.resolver";
import { JwtStrategyProvider } from "./JwtStrategy.provider";
import { JwtGraphqlStrategyGuard } from "./jwtStratedy.guard";
import { LocalStrategyGuard } from "./localStrategy.guard";

export const JWT_SECRET = "SECRET_ASD_12345";
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: JWT_SECRET,
    }),
  ],
  providers: [
    AuthRsolver,
    AuthService,
    LocalStrategyProvider,
    JwtStrategyProvider,
    // {
    //   provide: "APP_GUARD",
    //   useClass: LocalStrategyGuard,
    // },
  ],
  // exports: [],
})
export class AuthModule {}
