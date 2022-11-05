import { isNil, omit, omitBy } from "lodash";
import { DataSource, EntityManager } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import * as dayjs from "dayjs";
import isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);

interface IParams {
  time: string;
  duration: string;
  startTime: string;
  endTime: string;
}

export type GetAvalibleInterval = {
  start: Date;
  end: Date;
};

type Dayjs = dayjs.Dayjs;

@Injectable()
export class UtilsProvider {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async withTransaction(fn: (...args: any) => void) {
    return async (...args: any) => {
      const response = await this.dataSource.transaction(
        async (txn: EntityManager) => {
          return fn(txn, ...args);
        }
      );
      return response;
    };
  }

  buildWhere(
    alias: string,
    where: any,
    customWhere?: { query: string; field: string; value: any }[]
  ): [string, any] {
    where = omit(
      where,
      customWhere && customWhere.length ? customWhere.map((x) => x.field) : []
    );
    let computed = Object.keys(where)
      .map((curr) => `${alias}.${curr} = :${curr}`)
      .join(" AND ");

    if (customWhere && customWhere.length) {
      customWhere.forEach((item, index) => {
        if (index === 0) {
          if (Object.keys(where).length) {
            computed += " AND ";
          }
        } else {
          computed += " AND ";
        }

        computed += item.query;
      });
    }

    const customWhereKeysValues =
      customWhere && customWhere.length
        ? customWhere.reduce(
            (acc, curr) => ({ ...acc, [curr.field]: curr.value }),
            {}
          )
        : {};

    return [
      computed,
      {
        ...where,
        ...customWhereKeysValues,
      },
    ];
  }

  removeNullFields<T>(obj: any): Partial<T> {
    return omitBy(obj, isNil);
  }

  timeToUnix(time: string) {
    const hours = parseInt(time.substring(0, 3));
    const minutes = parseInt(time.substring(3, 6));
    const seconds = parseInt(time.substring(6, 8));

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);

    const unixTime = date.getTime();

    return unixTime;
  }

  isChoken = ({ duration, endTime, startTime, time }: IParams) => {
    const durationInMinutes = dayjs(this.timeToUnix(duration)).get("minutes");
    const durationInHours = dayjs(this.timeToUnix(duration)).get("hours");

    const timeWithDurationAdded: any = dayjs(this.timeToUnix(time))
      .add(durationInMinutes, "minutes")
      .add(durationInHours, "hours");

    if (
      (dayjs(this.timeToUnix(time)) as any).isBetween(
        this.timeToUnix(startTime),
        this.timeToUnix(endTime),
        "time",
        "()"
      ) ||
      timeWithDurationAdded.isBetween(
        this.timeToUnix(startTime),
        this.timeToUnix(endTime),
        "time",
        "()"
      )
    ) {
      return true;
    } else {
      const isBeforeOrSameTheStart =
        dayjs(this.timeToUnix(time)).isBefore(this.timeToUnix(startTime)) ||
        dayjs(this.timeToUnix(time)).isSame(this.timeToUnix(startTime));

      const isAfterOrSameTheEnd =
        timeWithDurationAdded.isAfter(this.timeToUnix(endTime)) ||
        timeWithDurationAdded.isSame(this.timeToUnix(endTime));

      if (isBeforeOrSameTheStart && isAfterOrSameTheEnd) {
        return true;
      }
    }
    return false;
  };

  delay(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 0);
    });
  }

  printDate(date: Dayjs | Date): void {
    const instance: Dayjs = dayjs.isDayjs(date) ? date : dayjs(date);
    console.log(instance.format("DD/MM/YYYY hh:mm:ssA"));
  }
}
