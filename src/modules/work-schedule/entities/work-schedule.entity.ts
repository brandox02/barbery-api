import { Field, ObjectType } from "@nestjs/graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { WorkInterval } from "./work-interval.entity";

@ObjectType()
@Entity({ name: "work_schedule_days", schema: "public" })
export class WorkSchedule2 {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  day: string;

  @Column({ type: "time" })
  @Field()
  start: string;

  @Column({ type: "time" })
  @Field()
  end: string;

  @Field(() => [WorkInterval])
  @OneToMany((_) => WorkInterval, (n) => n.workScheduleDay, {
    cascade: true,
  })
  workIntervals: WorkInterval[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
