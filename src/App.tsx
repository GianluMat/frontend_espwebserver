import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from "./pages/HomePage";
import { LightsPage } from "./pages/sensors/LightsPage";

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="lights" element={<LightsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

// export const App: React.FC = () => {
//   const [lightData, setLightData] = useState([]);
//   const [timestamps, setTimestamps] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "http://95.239.246.185:8086/api/sensors/data"
//         );
//         const data = await response.json();
//         console.log(data);
//         const currentTime = new Date().toLocaleTimeString();

//         setLightData((prevData) => [...prevData, data.value]);
//         setTimestamps((prevTime) => [...prevTime, currentTime]);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     const interval = setInterval(fetchData, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   const data = {
//     labels: timestamps,
//     datasets: [
//       {
//         label: "Light Intensity",
//         data: lightData,
//         fill: false,
//         backgroundColor: "rgba(75,192,192,0.2)",
//         borderColor: "rgba(75,192,192,1)",
//       },
//     ],
//   };

//   return (
//     <div className="App">
//       <h2 style={{ color: "blue" }}>Light Sensor Data</h2>
//       <Line data={data} />
//     </div>
//   );
// };
