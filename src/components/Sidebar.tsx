import React, { useState } from "react";
import {
  CircleChevronLeft,
  CircleChevronRight,
  CirclePercent,
  CirclePercentIcon,
  CircleUser,
  GaugeCircle,
  LogOut, // Correctly imported as LogOut
  LucideIcon,
  LucideScanBarcode,
  SlidersHorizontal,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Added useNavigate for logout
import Swal from "sweetalert2";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link to={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        }
        hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? "bg-blue-200 text-white" : ""
        }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />
        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
  const navigate = useNavigate(); // For handling logout

  const handleLogout = () => {
    // Perform logout actions here (e.g., clear session, remove tokens, etc.)

    Swal.fire({
      title: "Выход",
      text: "Вы действительно хотите выйти?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ffa230",
      confirmButtonText: "Выйти",
      cancelButtonText: "Отмена",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login"); // Redirect to the login page
      }
    });
  };

  return (
    <div
      className={`fixed font-serif top-0 left-0 h-full bg-white shadow-lg transition-width duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isCollapsed ? "px-5" : "px-8"
        }`}
      >
        <h1
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-extrabold text-2xl`}
        >
          Enrico Cerrini
        </h1>
        <button onClick={toggleSidebar}>
          {isCollapsed ? (
            <CircleChevronRight className="w-10 h-10 text-orange-500" />
          ) : (
            <CircleChevronLeft className="w-10 h-10 text-orange-500" />
          )}
        </button>
      </div>

      {/* LINKS */}
      <div className="flex-grow mt-8">
        <SidebarLink
          href="/"
          icon={GaugeCircle}
          label="Аналитика"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/sales"
          icon={CirclePercentIcon}
          label="Продажи"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/inventory"
          icon={LucideScanBarcode}
          label="Склад"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/employees"
          icon={CircleUser}
          label="Сотрудники"
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/settings"
          icon={SlidersHorizontal}
          label="Настройки"
          isCollapsed={isCollapsed}
        />
      </div>

      {/* LOGOUT BUTTON */}
      <div className={`${isCollapsed ? "px-5" : "px-8"} mb-10 mt-auto`}>
        <button
          onClick={handleLogout}
          className={`cursor-pointer flex items-center ${
            isCollapsed ? "justify-center py-4" : "justify-start py-4"
          }
          hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors w-full`}
        >
          <LogOut className="w-6 h-6 !text-gray-700" />
          {!isCollapsed && (
            <span className="font-medium text-gray-700">Выйти</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;