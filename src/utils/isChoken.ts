import dayjs from "dayjs";
dayjs.extend(require("dayjs/plugin/isBetween"));

interface IParams {
  time: string;
  duration: string;
  startTime: string;
  endTime: string;
}

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

export const isChoken = ({ duration, endTime, startTime, time }: IParams) => {
  const durationInMinutes = dayjs(timeToUnix(duration)).get("minutes");
  const durationInHours = dayjs(timeToUnix(duration)).get("hours");

  const timeWithDurationAdded: any = dayjs(timeToUnix(time))
    .add(durationInMinutes, "minutes")
    .add(durationInHours, "hours");

  if (
    (dayjs(timeToUnix(time)) as any).isBetween(
      timeToUnix(startTime),
      timeToUnix(endTime),
      "time",
      "()"
    ) ||
    timeWithDurationAdded.isBetween(
      timeToUnix(startTime),
      timeToUnix(endTime),
      "time",
      "()"
    )
  ) {
    return true;
  } else {
    const isBeforeOrSameTheStart =
      dayjs(timeToUnix(time)).isBefore(timeToUnix(startTime)) ||
      dayjs(timeToUnix(time)).isSame(timeToUnix(startTime));

    const isAfterOrSameTheEnd =
      timeWithDurationAdded.isAfter(timeToUnix(endTime)) ||
      timeWithDurationAdded.isSame(timeToUnix(endTime));

    if (isBeforeOrSameTheStart && isAfterOrSameTheEnd) {
      return true;
    }
  }
  return false;
};
