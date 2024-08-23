import axios from "axios";
export const API_BASE_URL = "http://95.239.246.185:8086/";

export const getRealTimeSensorsDataAsync = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}api/sensors/data`);
    return response; // Modifica se il payload della risposta è diverso
  } catch (error) {
    console.error("Error fetching sensors data:", error);
    throw error;
  }
};
