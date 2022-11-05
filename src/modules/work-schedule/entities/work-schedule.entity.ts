import { ObjectType } from "@nestjs/graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { WorkInterval } from "./work-interval.entity";

@ObjectType()
@Entity({ name: "work_schedule_days", schema: "public" })
export class WorkSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day: string;

  @Column({ type: "time" })
  start: string;

  @Column({ type: "time" })
  end: string;

  @OneToMany((_) => WorkInterval, (n) => n.workScheduleDay, {
    cascade: true,
  })
  workIntervals: WorkInterval[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
