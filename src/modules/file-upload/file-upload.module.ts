import { Module } from "@nestjs/common";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";
import { FileUploadService } from "./file-upload.provider";

@Module({
  imports: [CloudinaryModule],
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class FileUploadModule {}
