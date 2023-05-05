import axios from "axios";
import { settings } from "../../helpers/settings";

const API_URL = settings.apiURL;

export const getActivities = () => {
  return axios.get(`${API_URL}/activity`);
};
