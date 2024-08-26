import axios from "axios";
export const API_DB_URL = "https://flask-sensors-esp32.onrender.com";

export const getHistoryMessagesDataAsync = async (
  sensor?: string,
  location?: string
) => {
  try {
    const queryParams = new URLSearchParams();
    if (sensor) queryParams.append("sensor", sensor);
    if (location) queryParams.append("location", location);
    const response = await axios.get(`${API_DB_URL}/api/sensors/data`, {
      params: queryParams,
    });
    return response;
  } catch (error) {
    console.error("Error fetching history sensors data:", error);
    throw error;
  }
};
