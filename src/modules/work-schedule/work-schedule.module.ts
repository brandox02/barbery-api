import { Module } from "@nestjs/common";
import { WorkScheduleService } from "./work-schedule.service";
import { WorkScheduleResolver } from "./work-schedule.resolver";
import { UtilsProvider } from "src/common/UtilsProvider";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WorkSchedule } from "./entities/work-schedule.entity";

@Module({
  imports: [TypeOrmModule.forFeature([WorkSchedule])],
  providers: [WorkScheduleResolver, WorkScheduleService, UtilsProvider],
})
export class WorkScheduleModule {}
