import { Module } from "@nestjs/common";
import { ScheduleService } from "./schedule.service";
import { ScheduleResolver } from "./schedule.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Schedule } from "./entities/schedule.entity";
import { UtilsProvider } from "src/common/UtilsProvider";

@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  providers: [ScheduleResolver, ScheduleService, UtilsProvider],
})
export class ScheduleModule {}
