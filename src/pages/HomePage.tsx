import React, { useEffect, useState } from "react";
import { SensorCard } from "../components/SensorCard";
import { useMqtt } from "../context/MqttContext";
import { Sensor } from "../types/Sensors";
import { LightBulbIcon } from "@heroicons/react/24/solid";

export const HomePage: React.FC = () => {
  const [sensorCards, setSensorCards] = useState<Sensor[]>([]);
  const { messages } = useMqtt();

  useEffect(() => {
    const latestSensors: { [key: string]: Sensor } = {};

    // Elenco di messaggi, per ogni messaggio
    messages.forEach((message) => {
      const sensorType = message.sensor; // Sostituisci con il campo corretto del tuo messaggio
      const sensorValue = message.value; // Sostituisci con il campo corretto del tuo messaggio
      const sensorTimestamp = message.timestamp!; // Sostituisci con il campo corretto del tuo messaggio

      // Crea un oggetto Sensor con il valore e timestamp correnti
      const sensor: Sensor = {
        sensor: sensorType,
        value: sensorValue,
        timestamp: sensorTimestamp,
      };

      // Aggiorna il sensore più recente per questo ID
      latestSensors[sensorType] = sensor;
    });

    // Converti l'oggetto in un array
    setSensorCards(Object.values(latestSensors));
  }, [messages]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome to the Home Page</h1>
      <p className="mt-4">This is the home page content.</p>
      {sensorCards.map((sensorCard) => (
        <SensorCard
          icon={sensorCard.sensor}
          value={sensorCard.value}
          timestamp={sensorCard.timestamp!.toLocaleDateString()}
        />
      ))}
    </div>
  );
};
