exports.formatDate = (created_at) => {
  const day = created_at.slice(8, 10);
  const monthArr = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const month = monthArr[created_at.slice(5, 7) - 1];
  const year = created_at.slice(0, 4);
  return `${day} ${month} ${year}`;
}