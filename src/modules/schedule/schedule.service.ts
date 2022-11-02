import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import * as dayjs from "dayjs";
import { UtilsProvider } from "src/common/UtilsProvider";
import { DataSource, Repository } from "typeorm";
import { ScheduleInput, ScheduleWhereInput } from "./dto/input";
import { GetAvalibleIntervals, SchedulesPerDay } from "./dto/output";
import { Schedule } from "./entities/schedule.entity";

@Injectable()
export class ScheduleService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(Schedule) private readonly repo: Repository<Schedule>,
    private readonly utilsProvider: UtilsProvider
  ) {}

  async findAll(where: ScheduleWhereInput): Promise<Schedule[]> {
    interface CustomWhere {
      query: string;
      field: string;
      value: any;
    }
    const currentDate: Date = dayjs().subtract(1, "minutes").toDate();

    const customWhere: CustomWhere[] = [
      {
        query: "schedule.cancelled = :cancelled",
        field: "cancelled",
        value: false,
      },
      {
        query: "haircut.enabled = :enabled",
        field: "enabled",
        value: true,
      },
      {
        query: "schedule.schedule_date + haircut.duration >= :currentDate",
        field: "currentDate",
        value: currentDate,
      },
    ];

    if (where.date) {
      this.utilsProvider.printDate(where.date);
      customWhere.push({
        query: "CAST(schedule.schedule_date AS Date) = :date",
        field: "date",
        value: where.date,
      });
    } else if (where.dates) {
      where.dates.forEach((date) => {
        this.utilsProvider.printDate(date);
        console.log(
          "============================================================"
        );
      });
      customWhere.push({
        query: "CAST(schedule.schedule_date AS Date) IN(:...dates)",
        field: "dates",
        value: where.dates,
      });
    }

    const response = await this.dataSource
      .createQueryBuilder(Schedule, "schedule")
      .leftJoinAndSelect("schedule.haircut", "haircut")
      .leftJoinAndSelect("schedule.user", "user")
      .where(...this.utilsProvider.buildWhere("schedule", where, customWhere))
      .addOrderBy("haircut.name", "ASC")
      .getMany();

    return response;
  }

  async findOne(where: ScheduleInput): Promise<Schedule> {
    where.cancelled = false;
    const schedule = await this.repo.findOne({
      where: this.utilsProvider.removeNullFields<Schedule>(where),
      relations: ["user", "haircut"],
    });

    return schedule;
  }

  async getAvalibleIntervals(
    duration: string,
    busyDates: SchedulesPerDay[]
  ): Promise<GetAvalibleIntervals[]> {
    const timeToUnix = (time: string) => {
      const hours = parseInt(time.substring(0, 3));
      const minutes = parseInt(time.substring(3, 6));
      const seconds = parseInt(time.substring(6, 8));

      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      date.setSeconds(seconds);

      const unixTime = date.getTime();

      return unixTime;
    };
    const generateIntervals = (time: string) => {
      const minutes =
        dayjs(timeToUnix(time)).get("minutes") +
        dayjs(timeToUnix(time)).get("hours") * 60;

      const totalMinutes24 = 24 * 60;
      const arr = [];
      for (let i = 0; i < totalMinutes24; i += minutes) {
        const item = {
          start: dayjs(timeToUnix("00:00:00")).add(i, "minutes"),
          end: dayjs(timeToUnix("00:00:00")).add(i + minutes, "minutes"),
        };
        if (item.end.get("hours") === 0 || item.start.get("hours") === 0) {
          continue;
        }
        arr.push(item);
      }
      return arr;
    };

    const response: GetAvalibleIntervals[] = generateIntervals(duration)
      .filter(({ start }) => {
        const some = busyDates.some((schedule) =>
          this.utilsProvider.isChoken({
            duration,
            time: start.format("HH:mm:ss"),
            endTime: schedule.end,
            startTime: schedule.start,
          })
        );

        return !some;
      })
      .map((item) => ({ start: item.start.toDate(), end: item.end.toDate() }));

    return response;
  }

  async schedulesPerDay(date: Date): Promise<SchedulesPerDay[]> {
    type IWorkIntervals = { start: string; end: string; type: string }[];
    function buildNonWorkIntervals(workIntervals: IWorkIntervals) {
      const areContinues = (arg0: string, arg1: string) => {
        const num0 = parseInt(arg0.substring(0, 2));
        const num1 = parseInt(arg1.substring(0, 2));

        return num0 + 1 == num1 || num1 + 1 === num0;
      };

      const nonWorkIntervals = [...Array(24)]
        .map(
          (_, i) =>
            `${
              i.toString().length === 1 ? `0${i.toString()}` : i.toString()
            }:00:00`
        )
        .filter((x) =>
          workIntervals.every(
            (y: any) =>
              !this.utilsProvider.isChoken({
                time: x,
                duration: "00:00:00",
                startTime: y.start,
                endTime: y.end,
              })
          )
        )
        .reduce((acc: IWorkIntervals, curr: string) => {
          const blankTemplate = { start: curr, end: curr, type: "non-work" };
          if (!acc.length) {
            return [...acc, blankTemplate];
          }
          if (areContinues(curr, acc[acc.length - 1].end)) {
            const newArr = [...acc];
            newArr[newArr.length - 1] = {
              start: newArr[newArr.length - 1].start,
              end: curr,
              type: "non-work",
            };
            return newArr;
          }

          return [...acc, blankTemplate];
        }, []);

      return nonWorkIntervals;
    }

    const workIntervals = await this.dataSource.query(`
    --  select non-work intervals of the gived date
    select nw.start, nw.end , 'non-work' as "type"
    from work_hour_intervals nw  
    left join work_schedule_days ws on nw.work_schedule_day_id = ws.id
    where extract(isodow from date '${dayjs(date).format(
      "YYYY-MM-DD"
    )}') = ws.id
    `);

    const nonWorkIntervals = buildNonWorkIntervals(workIntervals);

    const nonAvaibleIntervals = await this.dataSource
      .query(`-- select the non-avaible intervals of the gived date
      select to_char(schedules.schedule_date, 'HH24:MI:SS') AS "start" ,
            to_char(schedules.schedule_date + CAST(haircuts.duration as Interval ), 'HH24:MI:SS') AS "end" 
            , 'non-avaible' as "type"
            from schedules 
            left join haircuts on haircuts.id = schedules.haircut_id
            where haircuts.enabled is true and CAST(schedules.schedule_date AS Date) = '${dayjs(
              date
            ).format("YYYY-MM-DD")}' and schedules.cancelled is false
      `);

    const response = [...nonAvaibleIntervals, ...nonWorkIntervals];
    return response;
  }

  async saveSchedule(schedule: ScheduleInput) {
    const scheduleSaved = await this.repo.save(this.repo.create(schedule));

    return this.repo.findOne({
      where: { id: scheduleSaved.id },
      relations: ["user", "haircut"],
    });
  }
}
