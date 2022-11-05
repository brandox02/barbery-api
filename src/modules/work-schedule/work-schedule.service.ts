import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { UtilsProvider } from "src/common/UtilsProvider";
import { DataSource, EntityManager, In, Repository } from "typeorm";
import { WorkScheduleInput } from "./dto/index.input";
import { WorkSchedule } from "./entities/work-schedule.entity";

@Injectable()
export class WorkScheduleService {
  constructor(
    @InjectRepository(WorkSchedule)
    private readonly repo: Repository<WorkSchedule>,
    private readonly utilsProvider: UtilsProvider,
    @InjectDataSource() private readonly dataSource: DataSource
  ) {}

  async findAll(where: WorkScheduleInput): Promise<WorkSchedule[]> {
    const workScheduleDays = await this.repo.find({
      where: this.utilsProvider.removeNullFields<WorkSchedule>(where),
      relations: {
        workIntervals: true,
      },
    });

    return workScheduleDays;
  }

  async findOne(where: WorkScheduleInput): Promise<WorkSchedule> {
    const workScheduleDay = await this.repo.findOne({
      where: this.utilsProvider.removeNullFields<WorkSchedule>(where),
      relations: {
        workIntervals: true,
      },
    });
    return workScheduleDay;
  }

  async saveOne(workScheduleDay: WorkScheduleInput): Promise<WorkSchedule> {
    return this.dataSource.transaction(async (txn: EntityManager) => {
      const repo = txn.getRepository(WorkSchedule);
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
  ): Promise<WorkSchedule[]> {
    return this.dataSource.transaction(async (txn) => {
      const workScheduleDayRepo = txn.getRepository(WorkSchedule);

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
