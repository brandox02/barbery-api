import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { uniqueConstraint } from "src/common/uniqueContraint";
import { NotFoundException } from "src/GqlExeptions/NotFoundExeption";
import { UtilsProvider } from "src/common/UtilsProvider";
import { FindOptionsOrder, Repository } from "typeorm";
import { AuthService, LoginOutput } from "../auth/auth.service";
import { FileUploadService } from "../file-upload/file-upload.provider";
import { UsersInput, UsersWhere } from "./dto/input";
import { User } from "./entities/users.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private readonly fileUploadService: FileUploadService,
    private readonly utils: UtilsProvider,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {}

  async findAll(
    where: UsersWhere,
    order: FindOptionsOrder<User> = { createdAt: "ASC" }
  ): Promise<User[]> {
    const filteredWhere = this.utils.removeNullFields<User>(where);

    const users = await this.repo.find({
      where: filteredWhere,
      order,
    });
    return users;
  }

  async findOne(where: UsersWhere): Promise<User | null> {
    const filteredWhere = this.utils.removeNullFields<User>(where);
    if (Object.keys(filteredWhere).length > 0) {
      const user = await this.repo.findOne({
        where: filteredWhere,
        order: {
          createdAt: "ASC",
        },
      });

      if (!user) {
        throw NotFoundException();
      }
      return user;
    }
    return null;
  }

  async save(user: UsersInput): Promise<LoginOutput> {
    await uniqueConstraint(this.repo, user, ["username", "email"]);
    const payload = await this.fileUploadService.uploadImage<User>(
      this.repo,
      user
    );
    const userSaved = await this.repo.save(this.repo.create(payload));
    if (!userSaved) throw new Error("User could not saved correctly");
    return this.authService.getToken(userSaved);
  }
}
