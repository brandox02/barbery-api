import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
@Injectable()
export class FileUploadService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  async uploadImage<T>(
    repo: Repository<any>,
    item: any,
    itemNotFoundErrorMessage?: string
  ): Promise<T> {
    let payload = { ...item };

    if (item?.image) {
      let imageId: string | null = null;
      let imageUrl: string | null = null;
      if (item.id) {
        const found = await repo.findOne({
          where: { id: item.id },
        });

        if (!found)
          throw new Error(
            itemNotFoundErrorMessage ||
              "Corte de pelo no encontrado con este identificador"
          );

        const { public_id, url } = await this.cloudinaryService.uploadImage(
          item.image,
          found?.imageId
        );
        imageId = public_id;
        imageUrl = url;
      } else {
        const { public_id, url } = await this.cloudinaryService.uploadImage(
          item.image
        );
        imageId = public_id;
        imageUrl = url;
      }

      payload = { ...item, imageId, imageUrl };
    }

    return payload;
  }
}
