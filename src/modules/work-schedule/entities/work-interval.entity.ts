import { Field, ObjectType } from "@nestjs/graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { WorkSchedule2 } from "./work-schedule.entity";

@ObjectType()
@Entity({ name: "work_hour_intervals", schema: "public" })
export class WorkInterval {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ name: "work_schedule_day_id", nullable: true })
  @Field()
  workScheduleDayId: number;

  @Column({ name: "description", nullable: true })
  @Field({ nullable: true })
  description: string;

  @ManyToOne(() => WorkSchedule2, (w) => w.workIntervals)
  @JoinColumn({
    name: "work_schedule_day_id",
  })
  workScheduleDay: WorkSchedule2;

  @Column({ type: "time" })
  @Field()
  start: string;

  @Column({ type: "time" })
  @Field()
  end: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
