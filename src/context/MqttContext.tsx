import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import mqtt, { MqttClient } from "mqtt";
import { MqttMessage } from "../types/Sensors";

interface SensorMessages {
  [key: string]: MqttMessage[]; // Dizionario con chiave sensor e valore una lista di messaggi
}

// Definisci il tipo per il contesto
interface MqttContextType {
  client: MqttClient | null;
  messages: SensorMessages;
  addMessage: (message: string) => void;
}

// Crea il contesto con un valore predefinito nullo
const MqttContext = createContext<MqttContextType | undefined>(undefined);

// Hook per usare il contesto MQTT
export const useMqtt = (): MqttContextType => {
  const context = useContext(MqttContext);
  if (!context) {
    throw new Error("useMqtt must be used within a MqttProvider");
  }
  return context;
};

// Definisci i tipi per il provider
interface MqttProviderProps {
  children: ReactNode;
}

// Componente MqttProvider che avvolge l'app
export const MqttProvider: React.FC<MqttProviderProps> = ({ children }) => {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [messages, setMessages] = useState<SensorMessages>({});

  useEffect(() => {
    // Connessione al broker MQTT
    const mqttClient = mqtt.connect("wss://broker.hivemq.com:8884/mqtt", {
      // Opzioni di connessione
      reconnectPeriod: 1000, // Tempo di riconnessione in ms
    });

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker");
      mqttClient.subscribe("gian33home/homesensors/#", (err) => {
        if (!err) {
          console.log("Subscribed to topic");
        } else {
          console.error("Subscription error:", err);
        }
      });
    });

    mqttClient.on("error", (err) => {
      console.error("MQTT connection error:", err);
    });

    mqttClient.on("close", () => {
      console.log("MQTT connection closed");
    });

    mqttClient.on("message", (topic, message) => {
      console.log(`Received message: ${message.toString()} on topic: ${topic}`);
      addMessage(message.toString());
    });

    // Imposta il client nello stato
    setClient(mqttClient);

    // Cleanup: disconnessione MQTT quando il provider viene smontato
    return () => {
      mqttClient.end();
    };
  }, []);

  // Funzione per aggiungere un messaggio al contesto
  const addMessage = (message: string) => {
    const msgMqtt = JSON.parse(message) as MqttMessage;

    setMessages((prevMessages) => {
      const sensorMessages = prevMessages[msgMqtt.sensor] || [];

      return {
        ...prevMessages,
        [msgMqtt.sensor]: [...sensorMessages, msgMqtt],
      };
    });
  };

  return (
    <MqttContext.Provider value={{ client, messages, addMessage }}>
      {children}
    </MqttContext.Provider>
  );
};
