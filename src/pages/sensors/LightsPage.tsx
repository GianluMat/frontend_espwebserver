import React, { useEffect, useState } from "react";
import {
  getHistorySensorsDataAsync,
  getRealTimeSensorsDataAsync,
} from "../../services/Api";
import { Sensor } from "../../types/Sensors";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { MqttComponent } from "../../components/MqttComponent";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LightsPage: React.FC = () => {
  const [lightData, setLightData] = useState<number[]>([]);
  const [timestamps, setTimestamps] = useState<string[]>([]);
  const [historyLightData, setHistoryLightData] = useState<number[]>([]);
  const [historyTimestamps, setHistoryTimestamps] = useState<string[]>([]);
  const [ishistoryDataVisible, setIsHistoryDataVisible] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRealTimeSensorsDataAsync();
        const currentTime = new Date().toLocaleTimeString();
        const sensor = response.data as Sensor;
        console.log(sensor);

        // Aggiorna lo stato con i nuovi dati
        setLightData((prevData) => [...prevData, sensor.value]);
        setTimestamps((prevTime) => [...prevTime, currentTime]);
      } catch (error) {
        console.error("Error fetching realtime data", error);
      }
    };

    // Esegui fetchData ogni 10 secondi
    const interval = setInterval(fetchData, 10000);

    // Pulisci l'intervallo quando il componente viene smontato
    return () => clearInterval(interval);
  }, []);

  const fetchHistoryData = async () => {
    try {
      const response = await getHistorySensorsDataAsync();
      const sensors = response.data as Sensor[];

      // Aggiorna lo stato con i dati presi dal db
      setHistoryLightData(sensors.map((sensor) => sensor.value));
      setHistoryTimestamps(
        sensors.map((sensor) =>
          new Date(sensor.timestamp!).toLocaleTimeString()
        )
      );
      setIsHistoryDataVisible(true);
    } catch (error) {
      console.error("Error fetching history data", error);
    }
  };

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: "Light Intensity",
        data: lightData,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const historyData = {
    labels: historyTimestamps,
    datasets: [
      {
        label: "History light Intensity",
        data: historyLightData,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold">Lights Page</h2>
      <p className="mt-4 mb-2 font-bold">Realtime light sensor data</p>
      <div className="w-[90%] h-[400px]">
        <Line data={data} options={options} />
      </div>
      <div className="w-full flex flex-col justify-center items-center mt-8 border-t border-gray-700">
        <div className="w-full flex items-center justify-center mt-4 mb-2">
          <p className="mr-5 font-bold">History light sensor data</p>
          <button
            onClick={fetchHistoryData}
            className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <ArrowPathIcon className="h-6 w-6" />
          </button>
        </div>
        {ishistoryDataVisible && (
          // <div className="w-full max-w-lg h-64 md:h-80 lg:h-96 mt-6">
          <div className="w-[90%] h-[400px]">
            <Line data={historyData} options={options} />
          </div>
        )}
      </div>
      <div className="w-full flex flex-col justify-center items-center mt-8 border-t border-gray-700">
        <div className="w-full flex items-center justify-center mt-4 mb-2">
          <p className="mr-5 font-bold">Mqtt light sensor data</p>
          <MqttComponent />
        </div>
      </div>
    </div>
  );
};
