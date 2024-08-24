import React, { useEffect, useState } from "react";
import mqtt from "mqtt";

export const MqttComponent: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // Connessione al broker MQTT usando WebSocket sicuro
    const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt", {
      // Opzioni di connessione
      reconnectPeriod: 1000, // Tempo di riconnessione in ms
    });

    client.on("connect", () => {
      console.log("Connected to MQTT broker");
      // Iscriviti a un topic
      client.subscribe("gian33home/sensors/#", (err) => {
        if (!err) {
          console.log("Subscribed to topic");
        } else {
          console.error("Subscription error:", err);
        }
      });
    });

    client.on("message", (topic, message) => {
      console.log(`Received message: ${message.toString()} on topic: ${topic}`);
      setMessages((prevMessages) => [...prevMessages, message.toString()]);
    });

    client.on("error", (err) => {
      console.error("Connection error:", err);
    });

    client.on("close", () => {
      console.log("Connection closed");
    });

    // Pulizia della connessione quando il componente viene smontato
    return () => {
      client.end();
    };
  }, []);

  return (
    <div>
      <h1>MQTT Messages</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};
