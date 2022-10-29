import { Injectable } from "@nestjs/common";
import { v2 as Cloudinary } from "cloudinary";

@Injectable()
export class CloudinaryService {
  async uploadImage(base64Image: string, public_id?: string) {
    if (public_id) {
      return Cloudinary.uploader.upload(base64Image, {
        public_id,
      });
    }

    return Cloudinary.uploader.upload(base64Image);
  }
}
