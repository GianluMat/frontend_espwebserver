import axios from "axios";
export const API_ESP_URL = "http://79.46.240.207:8086";
export const API_DB_URL = "https://flask-sensors-esp32.onrender.com";

export const getRealTimeSensorsDataAsync = async () => {
  try {
    const response = await axios.get(`${API_ESP_URL}/api/sensors/data`);
    return response;
  } catch (error) {
    console.error("Error fetching realtime sensors data:", error);
    throw error;
  }
};

export const getHistorySensorsDataAsync = async () => {
  try {
    const response = await axios.get(`${API_DB_URL}/api/sensors/data`);
    return response;
  } catch (error) {
    console.error("Error fetching history sensors data:", error);
    throw error;
  }
};
