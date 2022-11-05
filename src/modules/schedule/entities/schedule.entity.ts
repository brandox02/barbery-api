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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_id" })
  userId: number;

  @ManyToOne((_) => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "haircut_id" })
  haircutId: number;

  @ManyToOne((_) => Haircut)
  @JoinColumn({ name: "haircut_id" })
  haircut: Haircut;

  @Column({
    name: "schedule_date",
    type: "timestamp",
  })
  scheduleDate: Date;

  @Column({ default: false, nullable: true })
  cancelled: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
