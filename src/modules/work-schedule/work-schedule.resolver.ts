import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { WorkSchedule } from "./entities/work-schedule.entity";
import { WorkScheduleService } from "./work-schedule.service";
import { WorkScheduleInput } from "./dto/index.input";

@Resolver()
export class WorkScheduleResolver {
  constructor(private readonly service: WorkScheduleService) {}

  @Query(() => [WorkSchedule])
  async workScheduleDays(
    @Args("where", { nullable: true }) where: WorkScheduleInput
  ): Promise<WorkSchedule[]> {
    const workScheduleDays = await this.service.findAll(where);
    return workScheduleDays;
  }

  @Query(() => WorkSchedule, { nullable: true })
  async workScheduleDay(
    @Args("where") where: WorkScheduleInput
  ): Promise<WorkSchedule> {
    const workScheduleDays = await this.service.findOne(where);
    return workScheduleDays;
  }

  @Mutation(() => WorkSchedule, {
    nullable: true,
  })
  async saveWorkScheduleDay(
    @Args("workScheduleDay") workScheduleDay: WorkScheduleInput
  ): Promise<WorkSchedule> {
    const workScheduleDays = await this.service.saveOne(workScheduleDay);
    return workScheduleDays;
  }

  @Mutation(() => [WorkSchedule], {
    nullable: true,
  })
  async saveWorkScheduleDays(
    @Args({
      name: "workSchedule",
      type: () => [WorkScheduleInput],
    })
    workScheduleDaysInput: WorkScheduleInput[]
  ): Promise<WorkSchedule[]> {
    const workScheduleDaysResponse = await this.service.saveAll(
      workScheduleDaysInput
    );
    return workScheduleDaysResponse;
  }
}
