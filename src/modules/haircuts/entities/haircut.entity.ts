import { Field, ObjectType } from "@nestjs/graphql";
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
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true, name: "image_url" })
  @Field({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true, name: "image_id" })
  @Field({ nullable: true })
  imageId?: string;

  @Column({ type: "float" })
  @Field()
  price: number;

  @Column({ type: "time" })
  @Field()
  duration: string;

  @Column({ default: true })
  enabled: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
