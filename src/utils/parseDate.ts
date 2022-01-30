/** Parses a timestamp to a readable format, e.g. 22 janvier 2022 */
const parseDate = (timestamp: Date) => {
  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  const day = timestamp.getDate();
  const month = months[timestamp.getMonth()];
  const year = timestamp.getFullYear();

  return `${day} ${month} ${year}`;
};

export default parseDate;
