const formatDate = (date) => {
  const currentDate = new Date();
  const givenDate = new Date(date);
  const currentYear = currentDate.getFullYear();
  const givenYear = givenDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const givenMonth = givenDate.getMonth();
  const currentDay = currentDate.getDate();
  const givenDay = givenDate.getDate();

  const yearsDiff = currentYear - givenYear;
  const monthsDiff = currentMonth - givenMonth;
  const daysDiff = currentDay - givenDay;

  if (yearsDiff !== 0) {
    return `${yearsDiff} year(s) ago`;
  } else if (monthsDiff !== 0) {
    return `${monthsDiff} month(s) ago`;
  } else if (daysDiff !== 0) {
    return `${daysDiff} day(s) ago`;
  } else {
    return "Today";
  }
};
export default formatDate;
