import { ObjectType } from "@nestjs/graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity({ name: "haircuts", schema: "public" })
export class Haircut {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true, name: "image_url" })
  imageUrl?: string;

  @Column({ nullable: true, name: "image_id" })
  imageId?: string;

  @Column({ type: "float" })
  price: number;

  @Column({ type: "time" })
  duration: string;

  @Column({ default: true })
  enabled: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
