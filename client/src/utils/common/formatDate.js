import moment from "moment";
const formatDate = (date, typeFormat) => moment(date).format(typeFormat);
export default formatDate;
