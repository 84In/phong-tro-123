import formatDate from "./formatDate";

const valueCheck = ["Đang hoạt động", "Sắp hết hạn", "Đã quá hạn"];

const checkStatus = (dateTime1, dateTime2) => {
  const currentTime = formatDate(new Date().getTime(), "hh:mm:ss DD-MM-YYYY");
  const dateStart = formatDate(dateTime1, "hh:mm:ss DD-MM-YYYY");
  const dateEnd = formatDate(dateTime2, "hh:mm:ss DD-MM-YYYY");

  if (dateStart <= currentTime && currentTime < dateEnd) {
    return valueCheck[0];
  } else if (currentTime === dateEnd) {
    return valueCheck[1];
  } else if (dateStart < currentTime && currentTime > dateEnd)
    return valueCheck[2];
};

export default checkStatus;
