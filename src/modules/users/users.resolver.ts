import { Mutation, Query, Resolver } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { Args } from "@nestjs/graphql";
import { User } from "./entities/users.entity";
import { FileUploadService } from "../file-upload/file-upload.provider";
import { UsersInput } from "./dto/input/UsersInput.dto";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { LoginOutput } from "../auth/dto/output";

@Resolver()
export class UsersResolver {
  constructor(
    private readonly service: UsersService,
    // private readonly utils: UtilsProvider,
    private readonly fileUpload: FileUploadService,
    @InjectDataSource() private readonly dataSource: DataSource
  ) {}
  @Query(() => [User])
  async users(@Args("user", { nullable: true }) user: UsersInput) {
    return this.service.findAll(user);
  }

  @Query(() => User, { nullable: true })
  async user(@Args("where") where: UsersInput) {
    return this.service.findOne(where);
  }

  @Mutation(() => LoginOutput, {
    description:
      "create or update depending if send id or not, if is create you need to send all entity fields without a id, if is update just is obligatory send the _id field",
  })
  async saveUser(@Args("user") user: UsersInput): Promise<LoginOutput> {
    return this.service.save(user);
  }
}
