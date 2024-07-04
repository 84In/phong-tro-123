const valueCheck = ["Đang hoạt động", "Sắp hết hạn", "Đã quá hạn"];

const checkStatus = (dateTime1, dateTime2) => {
  const currentTime = new Date().getTime();
  const dateStart = new Date(dateTime1).getTime();
  const dateEnd = new Date(dateTime2).getTime();

  if (dateStart <= currentTime && currentTime < dateEnd) {
    return valueCheck[0];
  } else if (currentTime === dateEnd) {
    return valueCheck[1];
  } else if (currentTime > dateEnd) {
    return valueCheck[2];
  }
};

export default checkStatus;
