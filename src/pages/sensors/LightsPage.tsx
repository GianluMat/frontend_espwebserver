import React, { useEffect, useState } from "react";
import { getRealTimeSensorsDataAsync } from "../../services/Api";
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
        console.error("Error fetching data", error);
      }
    };

    // Esegui fetchData ogni 10 secondi
    const interval = setInterval(fetchData, 10000);

    // Pulisci l'intervallo quando il componente viene smontato
    return () => clearInterval(interval);
  }, []);

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

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold">Lights Page</h2>
      <p className="mt-4">This is the lights page.</p>
      <div className="w-[90%] h-[400px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};
