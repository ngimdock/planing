export const convertTimeFromStringToNumber = (stringDate) => {
  const dateSplited = stringDate.split(":");

  const hours = Number(dateSplited[0]) * 3600;
  const minutes = Number(dateSplited[1]) * 60;

  return hours + minutes;
};
