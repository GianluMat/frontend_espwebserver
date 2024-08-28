import GridLayout, { Layout } from "react-grid-layout";
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
  const [layout, setLayout] = useState<Layout[]>([]);

  const onLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
    localStorage.setItem("gridLayout", JSON.stringify(newLayout));
  };

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

    // Recupera il layout salvato
    const savedLayout = JSON.parse(localStorage.getItem("gridLayout") || "[]");

    if (savedLayout.length > 0) {
      // Verifica se tutti i sensori di latestSensorsData sono presenti nel layout salvato
      const newLayout = [...savedLayout];

      Object.keys(latestSensorsData).forEach((sensor) => {
        if (!newLayout.some((layoutItem) => layoutItem.i === sensor)) {
          console.log(newLayout);
          // Aggiungi il sensore mancante al layout
          newLayout.push({
            i: sensor,
            x: newLayout.length, // Puoi cambiare la logica di posizionamento
            y: 0,
            w: 1,
            h: 4,
          });
        }
      });

      setLayout(newLayout);
      localStorage.setItem("gridLayout", JSON.stringify(newLayout));
    } else {
      // Imposta un layout di default se non c'è nulla nel localStorage
      const initialLayout = Object.keys(latestSensorsData).map((sensor, i) => ({
        i: sensor,
        x: i,
        y: 0,
        w: 1,
        h: 4,
        static: false,
        moved: false,
      }));
      setLayout(initialLayout);
      localStorage.setItem("gridLayout", JSON.stringify(initialLayout));
    }
  }, [messages]);

  return (
    <GridLayout
      className="layout bg-blue-50"
      cols={4}
      rowHeight={30}
      width={1200}
      onLayoutChange={onLayoutChange}
      //   // This turns off compaction so you can place items wherever.
      //   verticalCompact={false}
      //   // This turns off rearrangement so items will not be pushed arround.
      //   preventCollision={true}
    >
      {_.map(Object.keys(latestSensors), (sensor, i) => (
        <div key={sensor} data-grid={layout.find((l) => l.i === sensor)}>
          <SensorCard key={i} sensorMessage={latestSensors[sensor]} />
        </div>
      ))}
    </GridLayout>
  );
};
