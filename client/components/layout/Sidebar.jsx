"use client";

import React, { useState } from "react";
import { DASHBOARD_TABS } from "../../lib/constants";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Sidebar({
  user,
  activeTab,
  setActiveTab,
  setShowServiceView,
  collapsed: externalCollapsed,
  onToggleCollapse,
}) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isCollapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;

  const toggleCollapse = () => {
    if (onToggleCollapse) {
      onToggleCollapse();
    } else {
      setInternalCollapsed(!internalCollapsed);
    }
  };

  return (
    <aside
      className={`
        sticky top-16 left-0
        ${isCollapsed ? "w-20" : "w-64"}
        h-[calc(100vh-4rem)]
        bg-white border-r border-slate-200/80
        transition-all duration-200 ease-in-out
        flex-shrink-0 z-30 select-none
      `}
    >
      <div className="flex flex-col h-full px-3 py-4">
        {/* SIDEBAR HEADER & TOGGLE */}
        <div
          className={`flex items-center mb-4 ${
            isCollapsed ? "justify-center" : "justify-between px-2"
          }`}
        >
          {!isCollapsed && (
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Workspace
            </span>
          )}
          <button
            onClick={toggleCollapse}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <FiChevronRight size={16} /> : <FiChevronLeft size={16} />}
          </button>
        </div>

        {/* NAVIGATION TAB BUTTONS */}
        <nav className="flex-1 space-y-1 overflow-y-auto pr-0.5">
          {DASHBOARD_TABS.map((tab) => {
            const isActive = activeTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => {
                  setShowServiceView(false);
                  setActiveTab(tab.name);
                }}
                className={`
                  flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 outline-none
                  focus-visible:ring-2 focus-visible:ring-indigo-500
                  ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-xs font-semibold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }
                  ${isCollapsed ? "justify-center px-0" : ""}
                `}
                title={isCollapsed ? tab.label : undefined}
              >
                <span className="text-base shrink-0">{tab.icon}</span>
                {!isCollapsed && <span className="truncate">{tab.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* FOOTER METRIC */}
        {!isCollapsed && (
          <div className="pt-3 border-t border-slate-100 text-center text-[11px] font-medium text-slate-400">
            NEB +2 Academic Suite
          </div>
        )}
      </div>
    </aside>
  );
}
