import moment from "moment";

function parseDateString(dateString) {
  const parts = dateString.split(", ");
  const [dayOfWeek, rest] = parts;
  const [time, date] = rest.split(" ");
  const [day, month, year] = date.split("/");
  const formattedDate = moment(
    `${year}-${month}-${day} ${time}`,
    "YYYY-MM-DD hh:mm"
  );
  return formattedDate;
}

export default parseDateString;
