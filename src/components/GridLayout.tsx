import GridLayout from "react-grid-layout";
import { MqttMessage } from "../types/Sensors";
import { useMqtt } from "../context/MqttContext";
import { useEffect, useState } from "react";
import _ from "lodash";
import { SensorCard } from "./SensorCard";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";

export const MyGridLayout: React.FC = () => {
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

  //   const layout = [
  //     { i: "0", x: 0, y: 0, w: 3, h: 4 }, //, static: true },
  //     // { i: "2", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
  //     // { i: "3", x: 4, y: 0, w: 1, h: 2 },
  //   ];
  return (
    <GridLayout
      className="layout"
      //   layout={layout}
      cols={4}
      rowHeight={30}
      width={1200}
    >
      {_.map(Object.keys(latestSensors), (sensor, i) => (
        <div key={i} data-grid={{ x: i, y: 0, w: 1, h: 4 }}>
          <SensorCard key={i} sensorMessage={latestSensors[sensor]} />
        </div>
      ))}
    </GridLayout>
  );
};
