import moment from "moment/moment";

export const formatDate = (date) => {
  return moment(date).format("L");
};
