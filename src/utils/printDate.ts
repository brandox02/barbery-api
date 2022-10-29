import dayjs, { Dayjs } from "dayjs";

export const printDate = (date: Dayjs | Date): void => {
  const instance: Dayjs = dayjs.isDayjs(date) ? date : dayjs(date);
  console.log(instance.format("DD/MM/YYYY hh:mm:ssA"));
};
