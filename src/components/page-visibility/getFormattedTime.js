export const getFormattedTime = date => {
  return `${getTimeValue(date.getHours())}:${getTimeValue(date.getMinutes())}:${getTimeValue(date.getSeconds())}`;
};

const getTimeValue = timepiece => {
  return `${timepiece < 10 ? '0' : ''}${timepiece}`;
};
