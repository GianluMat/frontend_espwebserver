import React, { useEffect, useState } from "react";
import { SensorCard } from "../components/SensorCard";
import { useMqtt } from "../context/MqttContext";
import { MqttMessage } from "../types/Sensors";
import _ from "lodash";

export const HomePage: React.FC = () => {
  const { messages } = useMqtt();
  const [latestSensors, setLatestSensors] = useState<{
    [key: string]: MqttMessage;
  }>({});

  useEffect(() => {
    const latestSensorsData: { [key: string]: MqttMessage } = {};

    // Itera su ciascun tipo di sensore nel dizionario dei messaggi
    Object.keys(messages).forEach((sensor) => {
      const sensorMessages = messages[sensor];

      if (sensorMessages.length > 0) {
        // Trova l'ultimo messaggio in base al timestamp
        const latestMessage = sensorMessages.reduce((latest, current) => {
          return current.timestamp! > latest.timestamp! ? current : latest;
        });

        latestSensorsData[sensor] = latestMessage;
      }
    });

    // Aggiorna lo stato con i sensori più recenti
    setLatestSensors(latestSensorsData);
  }, [messages]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome to the Home Page</h1>
      <p className="mt-4">This is the home page content.</p>
      {_.map(Object.keys(latestSensors), (sensor, i) => (
        <SensorCard key={i} sensorMessage={latestSensors[sensor]} />
      ))}
    </div>
  );
};
