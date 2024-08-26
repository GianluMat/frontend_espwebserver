import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Bars4Icon,
  XMarkIcon,
  HomeIcon,
  LightBulbIcon,
  CogIcon,
  FireIcon,
} from "@heroicons/react/24/solid";
import logoSmall from "../assets/images/LogoMini1.png";
import logoBig from "../assets/images/LogoBig.png";

export const Sidebar: React.FC = () => {
  const [isSideBarExpanded, setIsSideBarExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSideBarExpanded(!isSideBarExpanded);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={`relative flex flex-col h-full transition-width duration-300 ${
        isSideBarExpanded ? "w-64" : "w-16"
      } bg-blue-800 text-white`}
    >
      {/* Logo e Icona di Espansione/Contrazione */}
      <div className="relative flex items-center justify-between py-3 px-1 border-b border-gray-900">
        {/* Logo */}
        <img
          src={isSideBarExpanded ? logoBig : logoSmall}
          alt="Logo"
          className={`h-10 ${isSideBarExpanded ? "w-52" : "w-11"}`}
        />
        <div className="absolute top-1/2 transform -translate-y-1/2 transition-transform duration-300 right-[-0.8rem] z-40 flex items-center justify-center rounded-full bg-blue-800 p-1.5">
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
      <nav className="flex-1 py-2 px-3">
        <ul>
          <li
            className={`flex items-center py-2 rounded ${
              isActive("/") ? "bg-yellow-400 text-black" : "hover:bg-blue-700"
            }`}
          >
            <Link to="/" className="flex items-center w-full transition">
              <HomeIcon className="h-6 w-6 ml-2" />
              {isSideBarExpanded && <span className="ml-2">Home</span>}
            </Link>
          </li>
          <li
            className={`flex items-center py-2 mt-1 rounded ${
              isActive("/lights")
                ? "bg-yellow-400 text-black"
                : "hover:bg-blue-700"
            }`}
          >
            <Link to="/lights" className="flex items-center w-full transition">
              <LightBulbIcon className="h-6 w-6 ml-2" />
              {isSideBarExpanded && <span className="ml-2">Lights</span>}
            </Link>
          </li>
          <li
            className={`flex items-center py-2 mt-1 rounded ${
              isActive("/temperatures")
                ? "bg-yellow-400 text-black"
                : "hover:bg-blue-700"
            }`}
          >
            <Link
              to="/temperatures"
              className="flex items-center w-full transition"
            >
              <FireIcon className="h-6 w-6 ml-2" />
              {isSideBarExpanded && <span className="ml-2">Temperatures</span>}
            </Link>
          </li>
          {/* Aggiungi ulteriori voci di menu qui */}
        </ul>
      </nav>
      {/* account */}
      <div className="py-2 px-3 border-t border-gray-900">
        <div
          className={`flex items-center py-2 rounded ${
            isActive("/settings")
              ? "bg-yellow-400 text-black"
              : "hover:bg-blue-700"
          }`}
        >
          <Link to="/settings" className="flex items-center w-full transition">
            <CogIcon className="h-6 w-6 ml-2" />
            {isSideBarExpanded && <span className="ml-2">Settings</span>}
          </Link>
        </div>
        <div className="flex items-center justify-center w-full transition mt-2 mb-1">
          <img
            onClick={() => navigate("/account")}
            className="h-9 w-9 flex-none rounded-full cursor-pointer bg-gray-50"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
