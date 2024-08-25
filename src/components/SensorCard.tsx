import { LightBulbIcon } from "@heroicons/react/24/solid";
import React from "react";

interface SensorCardProps {
  // icon: React.FC<React.SVGProps<SVGSVGElement>>;
  icon: string;
  value: string | number;
  timestamp: string;
}

export const SensorCard: React.FC<SensorCardProps> = ({
  icon,
  value,
  timestamp,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4">
      <div className="flex-shrink-0">
        {icon === "light" && (
          <LightBulbIcon className="w-12 h-12 text-blue-500" />
        )}
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-semibold">{icon}</h2>
        <p className="text-gray-600 mt-1">{value}</p>
        <p className="text-xl font-semibold">{timestamp}</p>
      </div>
    </div>
  );
};
