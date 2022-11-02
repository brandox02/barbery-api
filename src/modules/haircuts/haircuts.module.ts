import { Module } from "@nestjs/common";
import { HaircutsService } from "./haircuts.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Haircut } from "./entities/haircut.entity";
import { FileUploadModule } from "../file-upload/file-upload.module";
import HaircutResolver from "./haircuts.resolver";
import { UtilsProvider } from "src/common/UtilsProvider";

@Module({
  imports: [TypeOrmModule.forFeature([Haircut]), FileUploadModule],
  providers: [HaircutResolver, HaircutsService, UtilsProvider],
})
export class HaircutsModule {}
