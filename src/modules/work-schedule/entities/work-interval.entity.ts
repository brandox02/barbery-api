import { ObjectType } from "@nestjs/graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { WorkSchedule } from "./work-schedule.entity";

@ObjectType()
@Entity({ name: "work_hour_intervals", schema: "public" })
export class WorkInterval {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "work_schedule_day_id", nullable: true })
  workScheduleDayId: number;

  @Column({ name: "description", nullable: true })
  description?: string;

  @ManyToOne(() => WorkSchedule, (w) => w.workIntervals)
  @JoinColumn({
    name: "work_schedule_day_id",
  })
  workScheduleDay: WorkSchedule;

  @Column({ type: "time" })
  start: string;

  @Column({ type: "time" })
  end: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
