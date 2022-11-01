import { forwardRef, Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { AuthResolver } from "./auth.resolver";
import { JwtStrategyProvider } from "./JwtStrategy.provider";
import { JwtGraphqlStrategyGuard } from "./jwtStratedy.guard";
import { ConfigService } from "@nestjs/config";
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get("JWT_SECRET_TOKEN");
        return {
          secret,
        };
      },
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategyProvider,
    {
      provide: "APP_GUARD",
      useClass: JwtGraphqlStrategyGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
