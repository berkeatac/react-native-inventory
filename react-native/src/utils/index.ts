const convertDateToDDMMYYYY = (time: string) => {
  const date = new Date(time);

  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + date.getMonth()).slice(-2);
  const year = date.getFullYear();

  const dateString = `${day}.${month}.${year}`;

  return dateString;
};

const isNewerThanWeek = (time: string) => {
  const date = new Date(time);
  const now = new Date();

  const diff = now.getTime() - date.getTime();
  const diffInDays = diff / (1000 * 3600 * 24);

  return diffInDays < 7;
};

export { convertDateToDDMMYYYY, isNewerThanWeek };
