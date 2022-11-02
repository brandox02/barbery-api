import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ScheduleInput {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  userId?: number;

  @Field({ nullable: true })
  haircutId?: number;

  @Field({ nullable: true })
  scheduleDate?: Date;

  @Field({ nullable: true })
  cancelled?: boolean;
}

@InputType()
export class ScheduleWhereInput {
  @Field({ nullable: true })
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
