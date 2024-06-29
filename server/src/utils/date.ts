
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import envConfig from '../configs/env.config';

dayjs.extend(utc);
dayjs.extend(timezone);

export const newDateOnly = () => {
  const date = new Date();
  const format = dayjs.tz(date, envConfig.APP_TIMEZONE);
  return format.format('YYYY-MM-DD');
};

export const newTimeOnly = () => {
  const date = new Date();
  const format = dayjs.tz(date, envConfig.APP_TIMEZONE);
  return format.format('HH:mm:ss');
};

export const newDate = () => {
  const date = new Date();
  const format = dayjs.tz(date, envConfig.APP_TIMEZONE);
  return format.format('YYYY-MM-DD HH:mm:ss');
};

export const formatDateOnly = (data: Date | string) => dayjs(data).format('YYYY-MM-DD')
