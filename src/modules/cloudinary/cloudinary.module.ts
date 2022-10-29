import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v2 as Cloudinary } from "cloudinary";
import { CloudinaryService } from "./cloudinary.service";

@Module({
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {
  constructor(private readonly configService: ConfigService) {
    Cloudinary.config({
      cloud_name: this.configService.get("CLOUDINARY_CLOUD_NAME"),
      api_key: this.configService.get("CLOUDINARY_API_KEY"),
      api_secret: this.configService.get("CLOUDINARY_API_SECRET"),
      secure: true,
    });
  }
}
