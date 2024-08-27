import React, { useEffect, useState } from "react";
import { getHistoryMessagesDataAsync } from "../../services/Api";
import { MqttMessage } from "../../types/Sensors";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useMqtt } from "../../context/MqttContext";
import _ from "lodash";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const LightsPage: React.FC = () => {
  const [historyMqttMessage, setHistoryMqttMessage] = useState<MqttMessage[]>(
    []
  );
  const [sensorData, setSensorData] = useState<number[]>([]);
  const [timestamps, setTimestamps] = useState<string[]>([]);
  const [historySensorData, setHistorySensorData] = useState<number[]>([]);
  const [historyTimestamps, setHistoryTimestamps] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedHistoryLocation, setSelectedHistoryLocation] = useState<
    string | null
  >(null);
  const [locations, setLocations] = useState<string[]>([]);
  const [historyLocations, setHistoryLocations] = useState<string[]>([]);
  const { messages } = useMqtt();
  const sensor = "light";

  const fetchHistoryData = async () => {
    try {
      setIsLoading(true);
      const response = await getHistoryMessagesDataAsync(sensor);
      const messages = response.data as MqttMessage[];

      setHistoryMqttMessage(messages);

      const filteredMessages = messages.filter(
        (message) => message.sensor === sensor
      );

      // Estrai le location uniche
      const uniqueHistoryLocations = [
        ...new Set(_.map(filteredMessages, (message) => message.location)),
      ];
      setHistoryLocations(uniqueHistoryLocations);

      const filteredSensorData = selectedLocation
        ? messages.filter(
            (message) => message.location === selectedHistoryLocation
          )
        : messages;

      setHistorySensorData(
        _.map(filteredSensorData, (message) => message.value)
      );
      setHistoryTimestamps(
        _.map(filteredSensorData, (message) => message.timestamp)
      );
    } catch (error) {
      console.error("Error fetching history data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterHistoryData = () => {
    const filteredSensorData = selectedHistoryLocation
      ? historyMqttMessage.filter(
          (message) => message.location === selectedHistoryLocation
        )
      : historyMqttMessage;

    setHistorySensorData(_.map(filteredSensorData, (message) => message.value));
    setHistoryTimestamps(
      _.map(filteredSensorData, (message) => message.timestamp)
    );
  };

  const setRealTimeSensorData = (sensor: string) => {
    const sensorMessages = messages[sensor];

    const uniqueLocations = [
      ...new Set(_.map(sensorMessages, (message) => message.location)),
    ];
    setLocations(uniqueLocations);

    const filteredSensorData = selectedLocation
      ? _.filter(
          sensorMessages,
          (message) => message.location === selectedLocation
        )
      : sensorMessages;

    if (filteredSensorData && filteredSensorData.length > 0) {
      setSensorData(_.map(filteredSensorData, (message) => message.value));
      setTimestamps(_.map(filteredSensorData, (message) => message.timestamp));
    }
  };

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: "Light Intensity",
        data: sensorData,
        fill: true,
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
        data: historySensorData,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };

  useEffect(() => {
    fetchHistoryData();
    setRealTimeSensorData(sensor);
  }, []);

  useEffect(() => {
    setRealTimeSensorData(sensor);
  }, [messages, selectedLocation]);

  useEffect(() => {
    filterHistoryData();
  }, [selectedHistoryLocation]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold">Lights Page</h2>
      <p className="mt-4 mb-2 font-bold">Realtime light sensor data</p>
      {/* Dropdown per selezionare la location in tempo reale */}
      <div className="mt-4 mb-2">
        <label className="font-bold mr-2">Select Location (Real-time):</label>
        <select
          value={selectedLocation || ""}
          onChange={(e) => setSelectedLocation(e.target.value || null)}
          className="border rounded px-3 py-2"
        >
          <option value="">All Locations</option>
          {_.map(locations, (location) => (
            <option key={"r" + location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
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
            <ArrowPathIcon
              className={`h-6 w-6 ${isLoading ? "animate-spin" : ""}`}
            />
          </button>
        </div>
        {/* Dropdown per selezionare la location storica */}
        <div className="mt-4 mb-2">
          <label className="font-bold mr-2">Select Location (History):</label>
          <select
            value={selectedHistoryLocation || ""}
            onChange={(e) => setSelectedHistoryLocation(e.target.value || null)}
            className="border rounded px-3 py-2"
          >
            <option value="">All Locations</option>
            {_.map(historyLocations, (location) => (
              <option key={"h" + location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        {/* <div className="w-full max-w-lg h-64 md:h-80 lg:h-96 mt-6"> */}
        <div className="w-[90%] h-[400px]">
          <Line data={historyData} options={options} />
        </div>
      </div>
    </div>
  );
};
