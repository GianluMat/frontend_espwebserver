import axios from "axios";
export const API_DB_URL = "https://flask-sensors-esp32.onrender.com";

export const getHistorySensorsDataAsync = async () => {
  try {
    const response = await axios.get(`${API_DB_URL}/api/sensors/data`);
    return response;
  } catch (error) {
    console.error("Error fetching history sensors data:", error);
    throw error;
  }
};
