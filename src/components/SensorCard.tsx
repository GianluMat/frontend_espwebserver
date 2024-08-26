import React from "react";
import {
  LightBulbIcon,
  FireIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import { MqttMessage } from "../types/Sensors";
import _ from "lodash";

interface SensorCardProps {
  sensorMessage: MqttMessage;
}

export const SensorCard: React.FC<SensorCardProps> = ({ sensorMessage }) => {
  const getIconComponent = (sensor: string) => {
    let iconComponent;

    switch (sensor) {
      case "light":
        iconComponent = <LightBulbIcon className="w-12 h-12 text-yellow-400" />;
        break;
      case "temperature":
        iconComponent = <FireIcon className="w-12 h-12 text-red-500" />;
        break;
      // case "humidity":
      //   iconComponent = <DropletIcon className="w-12 h-12 text-green-500" />;
      //   break;
      default:
        iconComponent = (
          <QuestionMarkCircleIcon className="w-12 h-12 text-gray-500" />
        );
    }

    return <div>{iconComponent}</div>;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 my-1 flex items-center space-x-4">
      <div className="flex-shrink-0">
        {getIconComponent(sensorMessage.sensor)}
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-semibold">
          {_.capitalize(sensorMessage.location)}
        </h2>
        <p className="text-xl font-semibold mt-1">
          {sensorMessage.value} {sensorMessage.unit}
        </p>
        <p className="text-gray-600">{sensorMessage.timestamp}</p>
        <p className="text-gray-600">{sensorMessage.device_id}</p>
      </div>
    </div>
  );
};
