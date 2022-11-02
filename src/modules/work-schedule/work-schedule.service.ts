import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { UtilsProvider } from "src/utils";
import { DataSource, EntityManager, In, Repository } from "typeorm";
import { WorkScheduleInput } from "./dto/input";
import { WorkSchedule2 } from "./entities/work-schedule.entity";

@Injectable()
export class WorkScheduleService {
  constructor(
    @InjectRepository(WorkSchedule2)
    private readonly repo: Repository<WorkSchedule2>,
    private readonly utilsProvider: UtilsProvider,
    @InjectDataSource() private readonly dataSource: DataSource
  ) {}

  async findAll(where: WorkScheduleInput): Promise<WorkSchedule2[]> {
    const workScheduleDays = await this.repo.find({
      where: this.utilsProvider.removeNullFields<WorkSchedule2>(where),
      relations: {
        workIntervals: true,
      },
    });

    return workScheduleDays;
  }

  async findOne(where: WorkScheduleInput): Promise<WorkSchedule2> {
    const workScheduleDay = await this.repo.findOne({
      where: this.utilsProvider.removeNullFields<WorkSchedule2>(where),
      relations: {
        workIntervals: true,
      },
    });
    return workScheduleDay;
  }

  async saveOne(workScheduleDay: WorkScheduleInput): Promise<WorkSchedule2> {
    return this.dataSource.transaction(async (txn: EntityManager) => {
      const repo = txn.getRepository(WorkSchedule2);
      const workScheduleDaySaved = await repo.save(
        repo.create(workScheduleDay)
      );

      return repo.findOne({
        where: { id: workScheduleDaySaved.id },
        relations: {
          workIntervals: true,
        },
      });
    });
  }

  async saveAll(
    workScheduleDays: WorkScheduleInput[]
  ): Promise<WorkSchedule2[]> {
    return this.dataSource.transaction(async (txn) => {
      const workScheduleDayRepo = txn.getRepository(WorkSchedule2);

      await workScheduleDayRepo.save(
        workScheduleDayRepo.create(workScheduleDays)
      );

      return workScheduleDayRepo.find({
        where: { id: In(workScheduleDays.map((x) => x.id)) },
        relations: {
          workIntervals: true,
        },
      });
    });
  }
}
