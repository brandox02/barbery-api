import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { HaircutsModule } from "./modules/haircuts/haircuts.module";
import { DatabaseModule } from "./modules/database/database.module";
import { FileUploadModule } from "./modules/file-upload/file-upload.module";
import { CloudinaryModule } from "./modules/cloudinary/cloudinary.module";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { WorkScheduleModule } from "./modules/work-schedule/work-schedule.module";
import { ScheduleModule } from "./modules/schedule/schedule.module";
import { AppController } from "./app.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      plugins: [ApolloServerPluginLandingPageLocalDefault],
      autoSchemaFile: true,
      playground: false,
    }),
    DatabaseModule,
    FileUploadModule,
    HaircutsModule,
    CloudinaryModule,
    UsersModule,
    AuthModule,
    WorkScheduleModule,
    ScheduleModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  constructor() {
    process.env.TZ = "America/Santo_Domingo";
  }
}
