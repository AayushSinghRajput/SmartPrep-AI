import React, { useState, useEffect, useMemo } from "react";
import {
  FiSearch,
  FiExternalLink,
  FiCalendar,
  FiCheckCircle,
  FiRefreshCw,
  FiBookOpen,
  FiActivity,
} from "react-icons/fi";
import { fetchIOENews, fetchIOMNews } from "../../services/entrance_news";

const EntranceNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeExam, setActiveExam] = useState("IOE");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  const handleFetchNews = async (exam) => {
    setLoading(true);
    setError(null);
    setActiveExam(exam);

    try {
      const data = exam === "IOE" ? await fetchIOENews() : await fetchIOMNews();
      setNews(data.news || []);
    } catch (err) {
      setError(err.toString());
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchNews("IOE");
  }, []);

  const getSourceName = (source) => {
    if (source && source.trim() !== "") {
      return source;
    }
    return activeExam === "IOE" ? "TU IOE Entrance Board" : "IOM Examination Board";
  };

  const tags = ["All", "Admit Card", "Exam Date", "Result", "Quota / Form"];

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchesSearch =
        (item.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.source || "").toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedTag === "All") return true;
      if (selectedTag === "Admit Card") return (item.title || "").toLowerCase().includes("admit");
      if (selectedTag === "Exam Date") return (item.title || "").toLowerCase().includes("date") || (item.title || "").toLowerCase().includes("schedule");
      if (selectedTag === "Result") return (item.title || "").toLowerCase().includes("result") || (item.title || "").toLowerCase().includes("score");
      if (selectedTag === "Quota / Form") return (item.title || "").toLowerCase().includes("form") || (item.title || "").toLowerCase().includes("quota") || (item.title || "").toLowerCase().includes("application");
      return true;
    });
  }, [news, searchQuery, selectedTag]);

  return (
    <div className="min-h-full pb-12">
      
      {/* Header Banner */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
              Live Official Entrance Bulletin
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Entrance Exam Updates & Notices
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Verified notices, seat distribution, deadlines, and results for IOE and IOM.
            </p>
          </div>

          <button
            onClick={() => handleFetchNews(activeExam)}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-sm transition-all"
          >
            <FiRefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-indigo-600" : ""}`} />
            <span>Refresh Bulletin</span>
          </button>
        </div>
      </div>

      {/* Segmented Exam Switcher */}
      <div className="bg-white p-1.5 rounded-2xl border border-slate-200/80 shadow-sm flex max-w-md mb-6">
        <button
          onClick={() => handleFetchNews("IOE")}
          className={`flex-1 py-2.5 px-4 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
            activeExam === "IOE"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          <FiBookOpen className="w-4 h-4" />
          <span>IOE Engineering (Pulchowk)</span>
        </button>

        <button
          onClick={() => handleFetchNews("IOM")}
          className={`flex-1 py-2.5 px-4 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
            activeExam === "IOM"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          <FiActivity className="w-4 h-4" />
          <span>IOM Medical (Maharajgunj)</span>
        </button>
      </div>

      {/* Search & Tag Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Filter notices by keyword (e.g. Admit card, Syllabus, Merit)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedTag === tag
                  ? "bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 mb-6 text-xs font-semibold text-rose-700">
          {error}
        </div>
      )}

      {/* Loading Skeleton States */}
      {loading && (
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm animate-pulse space-y-3">
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-100 rounded w-1/2" />
              <div className="flex justify-between pt-2">
                <div className="h-5 bg-slate-100 rounded-full w-24" />
                <div className="h-4 bg-slate-100 rounded w-20" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* News List Bento Grid */}
      {!loading && filteredNews.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredNews.map((item) => (
            <div
              key={item._id || item.link}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <FiExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 flex-shrink-0 transition-colors mt-1" />
                </div>

                <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-100 text-xs">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <FiCheckCircle className="w-3 h-3 text-emerald-600" />
                    {getSourceName(item.source)}
                  </span>

                  <div className="flex items-center text-slate-400 font-medium gap-1">
                    <FiCalendar className="w-3.5 h-3.5" />
                    <span>
                      {item.published_at
                        ? new Date(item.published_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "Official Bulletin"}
                    </span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredNews.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
            <FiBookOpen size={24} />
          </div>
          <h3 className="text-base font-semibold text-slate-900 mb-1">No Matching Notices Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery
              ? `No entrance updates matched "${searchQuery}". Try clearing search filters.`
              : `No official updates are currently active for ${activeExam}.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default EntranceNews;