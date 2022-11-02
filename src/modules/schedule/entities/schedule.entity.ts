import { Field, ObjectType } from "@nestjs/graphql";
import { Haircut } from "src/modules/haircuts/entities/haircut.entity";
import { User } from "src/modules/users/entities/users.entity";
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "schedules", schema: "public" })
@ObjectType()
export class Schedule {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: "user_id" })
  userId: number;

  @Field()
  @ManyToOne((_) => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Field()
  @Column({ name: "haircut_id" })
  haircutId: number;

  @Field()
  @ManyToOne((_) => Haircut)
  @JoinColumn({ name: "haircut_id" })
  haircut: Haircut;

  @Field()
  @Column({
    name: "schedule_date",
    type: "timestamp",
  })
  scheduleDate: Date;

  @Field()
  @Column({ default: false, nullable: true })
  cancelled: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
