import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ScheduleInput {
  id?: number;

  userId?: number;

  haircutId?: number;

  scheduleDate?: Date;

  cancelled?: boolean;
}

@InputType()
export class ScheduleWhereInput {
  id?: number;

  @Field({ nullable: true })
  date?: Date;

  @Field({ nullable: true })
  haircutId?: number;

  @Field({ nullable: true })
  userId?: number;

  @Field((_) => [Date], { nullable: true })
  dates?: Date[];
}
