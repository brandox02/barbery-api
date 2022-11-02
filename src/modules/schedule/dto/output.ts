import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SchedulesPerDay {
  @Field()
  start: string;

  @Field()
  end: string;

  @Field()
  type: string;
}

@ObjectType()
export class GetAvalibleIntervals {
  @Field()
  start: Date;

  @Field()
  end: Date;
}
