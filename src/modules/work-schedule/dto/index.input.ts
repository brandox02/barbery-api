import { InputType } from "@nestjs/graphql";

@InputType()
export class WorkIntevalInput {
  id?: number;

  workScheduleDayId?: number;

  description?: string;

  start?: string;

  end?: string;
}

@InputType()
export class WorkScheduleInput {
  id?: number;

  day?: string;

  start?: string;

  end?: string;

  workIntervals?: WorkIntevalInput[];
}
