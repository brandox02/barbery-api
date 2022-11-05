import { ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SchedulesPerDay {
  start: string;

  end: string;

  type: string;
}

@ObjectType()
export class GetAvalibleIntervals {
  start: Date;

  end: Date;
}
