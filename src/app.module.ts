import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { HaircutsModule } from "./modules/haircuts/haircuts.module";
import { DatabaseModule } from "./database/database.module";
import { FileUploadModule } from "./modules/file-upload/file-upload.module";
import { CloudinaryModule } from "./modules/cloudinary/cloudinary.module";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
@Module({
  imports: [
    HaircutsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      plugins: [ApolloServerPluginLandingPageLocalDefault],
      autoSchemaFile: true,
      playground: false,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    FileUploadModule,
    CloudinaryModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
