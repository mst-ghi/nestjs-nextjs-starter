import moment from 'moment-jalaali';

moment.locale('fa');
moment.loadPersian();

const TimeFormats = {
  default: 'jYYYY-jMM-jDD',
  custom: 'custom',
};

export const toDate = (
  date?: string,
  format: keyof typeof TimeFormats = 'default',
  customFormat = ''
): string => {
  if (!date) return '';

  if (format !== 'custom') {
    return moment(date).format(TimeFormats[format]);
  }

  return moment(date).format(customFormat);
};
