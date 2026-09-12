import { useState } from "react";
import { DASHBOARD_TABS } from "../../lib/constants";
import { formatAcademicId, getCleanUsername } from "../../lib/utils";

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
        bg-[var(--bg-card)]
        border-r border-[var(--border-primary)]
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
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Workspace
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-[var(--accent-light)] text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
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
        <div className={`mb-6 p-2.5 rounded-xl bg-[var(--bg-card-muted)] border border-[var(--border-primary)] ${collapsed ? "text-center" : "flex items-center gap-3"}`}>
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex-shrink-0 flex items-center justify-center text-sm font-bold text-white shadow-xs">
            {getCleanUsername(user).charAt(0).toUpperCase()}
          </div>

          {!collapsed && (
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-[var(--text-primary)] text-sm truncate">
                {getCleanUsername(user)}
              </h3>
              <p className="text-xs text-[var(--accent-primary)] font-medium">
                {user?.publicMetadata?.role || "Higher Ed Student"}
              </p>
              <p className="text-[11px] font-mono text-[var(--text-muted)] truncate">
                {formatAcademicId(user?._id || user?.id, user?.createdAt)}
              </p>
            </div>
          )}
        </div>

        {/* NAVIGATION / TAB BUTTONS */}
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {DASHBOARD_TABS.map((tab) => {
            const isActive = activeTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => {
                  setShowServiceView(false);
                  setActiveTab(tab.name);
                }}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500
                  ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-xs font-semibold"
                      : "text-[var(--text-secondary)] hover:bg-[var(--accent-light)] hover:text-[var(--text-primary)]"
                  } ${collapsed ? "justify-center px-0" : ""}`}
                title={collapsed ? tab.label : undefined}
              >
                <span className={`text-lg ${isActive ? "text-white" : "text-[var(--text-muted)]"}`}>{tab.icon}</span>
                {!collapsed && (
                  <span className="truncate">{tab.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* FOOTER / STANDARD INFO */}
        {!collapsed && (
          <div className="pt-3 border-t border-[var(--border-primary)] text-center text-[11px] font-medium text-[var(--text-muted)]">
            SmartPrep Academic Suite
          </div>
        )}
      </div>
    </aside>
  );
}
