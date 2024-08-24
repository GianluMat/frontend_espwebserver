import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bars4Icon,
  XMarkIcon,
  HomeIcon,
  LightBulbIcon,
  CogIcon,
} from "@heroicons/react/24/solid";
import logoSmall from "../assets/images/LogoMini1.png";
import logoBig from "../assets/images/LogoBig.png";

export const Sidebar: React.FC = () => {
  const [isSideBarExpanded, setIsSideBarExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSideBarExpanded(!isSideBarExpanded);
  };

  return (
    <aside
      className={`relative flex flex-col h-full transition-width duration-300 ${
        isSideBarExpanded ? "w-64" : "w-20"
      } bg-gray-800 text-white`}
    >
      {/* Logo e Icona di Espansione/Contrazione */}
      <div className="relative flex items-center justify-between p-3 border-b border-gray-700">
        {/* Logo */}
        <img
          src={isSideBarExpanded ? logoBig : logoSmall}
          alt="Logo"
          className={`h-12 ${isSideBarExpanded ? "w-52" : "w-12"}`}
        />
        <div className="absolute top-1/2 transform -translate-y-1/2 transition-transform duration-300 right-[-0.5rem] z-40 flex items-center justify-center rounded-full bg-gray-800 p-1">
          <button
            onClick={toggleSidebar}
            // className="absolute top-1/2 transform -translate-y-1/2 transition-transform duration-300 right-[-0.5rem]"
          >
            {isSideBarExpanded ? (
              <XMarkIcon className="h-5 w-5" />
            ) : (
              <Bars4Icon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Navigazione */}
      <nav className="flex-1 p-3">
        <ul>
          <li className="flex items-center py-2 p2-4 hover:bg-gray-700 rounded">
            <Link
              to="/"
              className={`flex items-center w-full transition ${
                isSideBarExpanded ? "" : "justify-center"
              }`}
            >
              <HomeIcon
                className={`h-6 w-6 ${isSideBarExpanded ? "mr-2" : ""}`}
              />
              {isSideBarExpanded && <span>Home</span>}
            </Link>
          </li>
          <li className="flex items-center py-2 p2-4 hover:bg-gray-700 rounded">
            <Link
              to="/lights"
              className={`flex items-center w-full transition ${
                isSideBarExpanded ? "" : "justify-center"
              }`}
            >
              <LightBulbIcon
                className={`h-6 w-6 ${isSideBarExpanded ? "mr-2" : ""}`}
              />
              {isSideBarExpanded && <span>Lights</span>}
            </Link>
          </li>
          {/* Aggiungi ulteriori voci di menu qui */}
        </ul>
      </nav>
      {/* account */}
      <div className="p-3 border-t border-gray-700">
        <div className="flex items-center py-2 p2-4 mb-2 hover:bg-gray-700 rounded">
          <Link
            to="/settings"
            className={`flex items-center w-full transition ${
              isSideBarExpanded ? "" : "justify-center"
            }`}
          >
            <CogIcon className={`h-6 w-6 ${isSideBarExpanded ? "mr-2" : ""}`} />
            {isSideBarExpanded && <span>Settings</span>}
          </Link>
        </div>
        <div
          className={`flex items-center w-full transition ${
            isSideBarExpanded ? "" : "justify-center"
          }`}
        >
          <img
            onClick={() => navigate("/account")}
            className="h-12 w-12 flex-none rounded-full cursor-pointer bg-gray-50"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
