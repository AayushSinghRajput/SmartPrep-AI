import Image from "next/image";
import { useState } from "react";
import { DASHBOARD_TABS } from "../../lib/constants";
import { formatAcademicId, getCleanUsername } from "../../lib/utils";
import companyLogoImg from "../../assets/images/Company_Logo.png";

export default function Sidebar({
  user,
  activeTab,
  setActiveTab,
  setShowServiceView,
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
        sticky top-16 left-0
        ${collapsed ? "w-20" : "w-64"}
        h-[calc(100vh-4rem)]
        bg-white
        border-r border-slate-200
        transition-all duration-200 ease-in-out
        flex-shrink-0
        z-40
      `}
    >
      <div className="flex flex-col h-full px-3 py-4">
        {/* SIDEBAR TOGGLE BUTTON */}
        <div
          className={`flex items-center mb-4 ${collapsed ? "justify-center" : "justify-between px-2"}`}
        >
          {!collapsed && (
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Workspace
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        {/* USER PROFILE SECTION */}
        <div className={`mb-6 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 ${collapsed ? "text-center" : "flex items-center gap-3"}`}>
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex-shrink-0 flex items-center justify-center text-sm font-bold text-white shadow-sm">
            {getCleanUsername(user).charAt(0).toUpperCase()}
          </div>

          {!collapsed && (
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-slate-900 text-sm truncate">
                {getCleanUsername(user)}
              </h3>
              <p className="text-xs text-indigo-600 font-medium">
                {user?.publicMetadata?.role || "Higher Ed Student"}
              </p>
              <p className="text-[11px] font-mono text-slate-400 truncate">
                {formatAcademicId(user?._id || user?.id, user?.createdAt)}
              </p>
            </div>
          )}
        </div>

        {/* NAVIGATION / TAB BUTTONS */}
        <nav className="flex-1 space-y-1">
          {DASHBOARD_TABS.map((tab) => {
            const isActive = activeTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => {
                  setShowServiceView(false);
                  setActiveTab(tab.name);
                }}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500
                  ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm font-semibold"
                      : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                  } ${collapsed ? "justify-center px-0" : ""}`}
              >
                <span className={`text-lg ${isActive ? "text-white" : "text-slate-500"}`}>{tab.icon}</span>
                {!collapsed && (
                  <span className="truncate">{tab.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* FOOTER / STANDARD INFO */}
        {!collapsed && (
          <div className="pt-3 border-t border-slate-100 text-center text-[11px] font-medium text-slate-400">
            SmartPrep Academic Suite
          </div>
        )}
      </div>
    </aside>
  );
}
