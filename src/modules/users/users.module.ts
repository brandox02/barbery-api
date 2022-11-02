import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UtilsProvider } from "src/common/UtilsProvider";
import { AuthModule } from "../auth/auth.module";
import { FileUploadModule } from "../file-upload/file-upload.module";
import { User } from "./entities/users.entity";
import { UsersService } from "./users.service";
import { UsersResolver } from "./users.resolver";

@Module({
  imports: [
    FileUploadModule,
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
  ],
  providers: [UsersService, UtilsProvider, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
