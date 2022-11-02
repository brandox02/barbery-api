import { Mutation, Query, Resolver, Args } from "@nestjs/graphql";
import { Schedule } from "./entities/schedule.entity";
import { GetAvalibleIntervals, SchedulesPerDay } from "./dto/output";
import { ScheduleInput, ScheduleWhereInput } from "./dto/input";
import { ScheduleService } from "./schedule.service";

@Resolver()
export class ScheduleResolver {
  constructor(private readonly service: ScheduleService) {}
  @Query(() => [Schedule])
  async schedules(
    @Args("where", { nullable: true }) where: ScheduleWhereInput
  ) {
    return this.service.findAll(where);
  }

  @Query(() => Schedule, { nullable: true })
  async schedule(@Args("where") where: ScheduleInput): Promise<Schedule> {
    return this.service.findOne(where);
  }

  @Query(() => [SchedulesPerDay])
  async schedulesPerDay(
    @Args("date", { nullable: true }) date: Date
  ): Promise<SchedulesPerDay[]> {
    return this.service.schedulesPerDay(date);
  }

  @Query(() => [GetAvalibleIntervals])
  async getAvalibleIntervals(
    @Args("duration") duration: string,
    @Args("date") date: Date
  ): Promise<GetAvalibleIntervals[]> {
    const busyDates = await this.schedulesPerDay(date);
    return this.service.getAvalibleIntervals(duration, busyDates);
  }

  @Mutation(() => Schedule, {
    description:
      "create or update depending if send _id or not, if is create you need to send all entity fields without a _id, if is update just is obligatory send the _id field",
  })
  async saveSchedule(@Args("schedule") schedule: ScheduleInput) {
    return this.service.saveSchedule(schedule);
  }
}
