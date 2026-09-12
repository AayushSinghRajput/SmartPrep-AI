"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-hot-toast";

import ProtectedRoute from "../../components/ui/ProtectedRoute";
import Sidebar from "../../components/layout/Sidebar";
import DashboardContent from "../../components/dashboard/DashboardContent";
import StudyBooksGrid from "../../components/dashboard/StudyBooksGrid";
import Service from "../service";
import MockTest from "../../components/mock/MockTest";
import { useAuth } from "../../context/AuthContext";
import { getBookSchedule } from "../../services/pdf";
import CommunityPage from "../../components/Community/CommunityPage";
import EntranceNews from "../../components/entrance_news/EntranceNews";
import SettingsView from "../../components/settings/SettingsView";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showServiceView, setShowServiceView] = useState(false);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [aiPlan, setAiPlan] = useState(null);

  const { user } = useAuth();

  const handleUploadSuccess = (data) => {
    setAiPlan(data);
    setShowServiceView(true);
    setShowUploadPopup(false);

    if (data?.pdf_hash) {
      localStorage.setItem("lastBookHash", data.pdf_hash);
    }
  };

  const fetchBookSchedule = async (pdf_hash) => {
    if (!pdf_hash) return;

    const toastId = toast.loading("Fetching schedule...");

    try {
      const { success, schedule, book_name, image, pdf_url, message } =
        await getBookSchedule(pdf_hash);

      if (!success) {
        toast.error(message || "Failed to fetch schedule", { id: toastId });
        return;
      }

      setAiPlan({
        pdf_hash,
        book_name,
        image,
        pdf_url,
        schedule: schedule || [],
      });

      setShowServiceView(true);
      localStorage.setItem("lastBookHash", pdf_hash);
      toast.success("Schedule loaded!", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleBookClick = (book) => {
    if (!book?.pdf_hash) {
      toast.error("PDF not found");
      return;
    }
    fetchBookSchedule(book.pdf_hash);
  };

  const renderContent = () => {
    if (showServiceView && aiPlan) {
      return (
        <Service
          planData={aiPlan}
          activeTab={activeTab}
          onBack={() => setShowServiceView(false)}
        />
      );
    }

    if (activeTab === "mock") {
      return <MockTest />;
    }

    if (activeTab === "community") {
      return <CommunityPage />;
    }

    if (activeTab === "entranceNews") {
      return <EntranceNews />;
    }

    if (activeTab === "settings") {
      return <SettingsView />;
    }

    return (
      <StudyBooksGrid activeTab={activeTab} onBookClick={handleBookClick} />
    );
  };

  const showUploadButton = activeTab === "dashboard" && !showServiceView;
  const isFullBleed = showServiceView && Boolean(aiPlan);

  return (
    <ProtectedRoute>
      <div className="bg-[var(--bg-page)] text-[var(--text-primary)] min-h-screen pt-16 transition-colors">
        <div className="flex min-h-[calc(100vh-4rem)]">
          <Sidebar
            user={user}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setShowServiceView={setShowServiceView}
          />

          <div className={`flex-1 relative ${isFullBleed ? "p-0 overflow-hidden" : "px-4 sm:px-6 py-6"}`}>
            {showUploadButton && (
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setShowUploadPopup(true)}
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  <FiPlus className="w-4 h-4" /> Upload New Book
                </button>
              </div>
            )}

            {renderContent()}
          </div>
        </div>

        {showUploadPopup && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
              <DashboardContent
                onUploadSuccess={handleUploadSuccess}
                onClose={() => setShowUploadPopup(false)}
              />
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
