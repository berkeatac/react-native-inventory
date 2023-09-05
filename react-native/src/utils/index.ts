const convertDateToDDMMYYYY = (time: string) => {
  const date = new Date(time);

  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + date.getMonth()).slice(-2);
  const year = date.getFullYear();

  const dateString = `${day}.${month}.${year}`;

  return dateString;
};

export { convertDateToDDMMYYYY };
