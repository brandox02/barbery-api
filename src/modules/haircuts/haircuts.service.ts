import { Injectable } from "@nestjs/common";
import { Args } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { NotFoundException } from "src/GqlExeptions/NotFoundExeption";
import { UtilsProvider } from "src/utils";
import { FindOptionsOrder, Repository } from "typeorm";
import { FileUploadService } from "../file-upload/file-upload.provider";
import { HaircutInput } from "./dto/inputs";
import { Haircut } from "./entities/haircut.entity";

@Injectable()
export class HaircutsService {
  constructor(
    @InjectRepository(Haircut) private readonly repo: Repository<Haircut>,
    private readonly fileUploadService: FileUploadService,
    private readonly utils: UtilsProvider
  ) {}

  async findAll(
    where: HaircutInput,
    order: FindOptionsOrder<Haircut> = { name: "ASC" }
  ): Promise<Haircut[]> {
    const filteredWhere = this.utils.removeNullFields<Haircut>(where);

    filteredWhere.enabled = true;
    const haircuts = await this.repo.find({
      where: filteredWhere,
      order,
    });
    return haircuts;
  }

  async findOne(where: HaircutInput): Promise<Haircut | null> {
    const filteredWhere = this.utils.removeNullFields<Haircut>(where);
    if (Object.keys(filteredWhere).length > 0) {
      filteredWhere.enabled = true;
      const haircut = await this.repo.findOne({
        where: filteredWhere,
        order: {
          name: "ASC",
        },
      });

      if (!haircut) {
        throw NotFoundException();
      }
      return haircut;
    }
    return null;
  }

  async save(@Args("haircut") haircut: HaircutInput) {
    const payload = await this.fileUploadService.uploadImage<Haircut>(
      this.repo,
      haircut
    );
    const haircutSaved = await this.repo.save(this.repo.create(payload));
    if (!haircutSaved) throw new Error("Haircut could not saved correctly");

    return this.repo.findOne({ where: { id: haircutSaved.id } });
  }
}
