"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FiMenu,
  FiX,
  FiLogOut,
  FiHome,
  FiBookOpen,
  FiAward,
  FiCheckCircle,
  FiGrid,
  FiFileText,
  FiUsers,
  FiSettings,
} from "react-icons/fi";
import Logo from "../ui/Logo";
import Sidebar from "./Sidebar";
import { useAuth } from "@/context/AuthContext";
import { DASHBOARD_TABS } from "@/lib/constants";
import { getCleanUsername } from "@/lib/utils";

export interface DashboardShellProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setShowServiceView: (show: boolean) => void;
  isFullBleed?: boolean;
}

export default function DashboardShell({
  children,
  activeTab,
  setActiveTab,
  setShowServiceView,
  isFullBleed = false,
}: DashboardShellProps) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleSignOut = async () => {
    await logout();
    router.push("/login");
  };

  const username = getCleanUsername(user);
  const currentTabLabel =
    DASHBOARD_TABS.find((t) => t.name === activeTab)?.label || "Dashboard";

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 font-sans antialiased">
      {/* TOP DASHBOARD NAVBAR */}
      <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation drawer"
          >
            {mobileDrawerOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>

          <Logo variant="dark" size="sm" href="/" />

          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-400 pl-3 border-l border-slate-200">
            <span>Workspace</span>
            <span>/</span>
            <span className="text-slate-800 font-bold">{currentTabLabel}</span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <FiHome className="w-3.5 h-3.5" />
            <span>Public Home</span>
          </Link>

          <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {username.charAt(0).toUpperCase()}
            </div>
            <span className="hidden md:inline-block text-xs font-bold text-slate-800 max-w-[120px] truncate">
              {username}
            </span>
            <button
              onClick={handleSignOut}
              title="Sign Out"
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              aria-label="Sign Out"
            >
              <FiLogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* DASHBOARD BODY (SIDEBAR + MAIN CONTENT) */}
      <div className="flex flex-1 min-h-[calc(100vh-4rem)]">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar
            user={user}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setShowServiceView={setShowServiceView}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>

        {/* Main Content Viewport */}
        <main
          className={`flex-1 relative ${
            isFullBleed ? "p-0 overflow-hidden" : "p-4 sm:p-6 lg:p-8"
          } pb-20 md:pb-8`}
        >
          {children}
        </main>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-white/95 backdrop-blur-md border-t border-slate-200/80 z-40 flex items-center justify-around px-2">
        {DASHBOARD_TABS.slice(0, 5).map((tab) => {
          const isActive = activeTab === tab.name;
          return (
            <button
              key={tab.name}
              onClick={() => {
                setShowServiceView(false);
                setActiveTab(tab.name);
              }}
              className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-semibold transition-colors ${
                isActive ? "text-indigo-600 font-bold" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              <span className="truncate max-w-[60px]">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* MOBILE FULL DRAWER */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setMobileDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed top-0 bottom-0 left-0 w-72 bg-white shadow-2xl p-5 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <Logo variant="dark" size="sm" href="/" />
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
                  aria-label="Close drawer"
                >
                  <FiX size={18} />
                </button>
              </div>

              <div className="space-y-1">
                {DASHBOARD_TABS.map((tab) => {
                  const isActive = activeTab === tab.name;
                  return (
                    <button
                      key={tab.name}
                      onClick={() => {
                        setShowServiceView(false);
                        setActiveTab(tab.name);
                        setMobileDrawerOpen(false);
                      }}
                      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-indigo-600 text-white"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <span className="text-lg">{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <Link
                href="/"
                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-slate-50"
              >
                <FiHome className="w-4 h-4" />
                <span>Return to Homepage</span>
              </Link>
              <button
                onClick={() => {
                  handleSignOut();
                  setMobileDrawerOpen(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg"
              >
                <FiLogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

