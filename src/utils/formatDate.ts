const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const shortMonthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export const formatDate = (value: string | Date): string => {
  if (!value) return '';
  const d = new Date(value);
  if (isNaN(d.getTime())) return String(value);
  return `${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

export const formatShortDate = (value: string | Date): string => {
  if (!value) return '';
  const d = new Date(value);
  if (isNaN(d.getTime())) return String(value);
  return `${shortMonthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

export const formatDateRange = (
  startDate: string | Date,
  endDate: string | Date
): string => {
  if (!startDate) return '';
  if (!endDate) return formatDate(startDate);

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return `${formatDate(startDate)} – ${formatDate(endDate)}`;
  }

  const startYear = start.getFullYear();
  const endYear = end.getFullYear();
  const startMonth = start.getMonth();
  const endMonth = end.getMonth();
  const startDay = start.getDate();
  const endDay = end.getDate();

  // Same day
  if (startYear === endYear && startMonth === endMonth && startDay === endDay) {
    return `${monthNames[startMonth]} ${startDay}, ${startYear}`;
  }

  // Same month and year
  if (startYear === endYear && startMonth === endMonth) {
    return `${monthNames[startMonth]} ${startDay}–${endDay}, ${startYear}`;
  }

  // Same year, different months
  if (startYear === endYear) {
    return `${monthNames[startMonth]} ${startDay} – ${monthNames[endMonth]} ${endDay}, ${startYear}`;
  }

  // Different years
  return `${monthNames[startMonth]} ${startDay}, ${startYear} – ${monthNames[endMonth]} ${endDay}, ${endYear}`;
};

export default formatDate;

