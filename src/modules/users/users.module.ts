import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UtilsProvider } from "src/utils";
import { FileUploadModule } from "../file-upload/file-upload.module";
import { User } from "./entities/users.entity";
import { UsersService } from "./users.service";

@Module({
  imports: [FileUploadModule, TypeOrmModule.forFeature([User])],
  providers: [UsersService, UtilsProvider],
  exports: [UsersService],
})
export class UsersModule {}
