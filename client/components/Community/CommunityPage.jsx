"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getMyPosts } from "../../services/community";
import PostButton from "./PostButton";
import PostPopup from "./PostPopup";
import UserPosts from "./UserPosts";

export default function CommunityPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Fetch posts on mount
  useEffect(() => {
    if (!user) return;

    const fetchPosts = async () => {
      try {
        const data = await getMyPosts();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, [user]);

  // Add new post
  const handlePostSuccess = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-slate-500 bg-white rounded-2xl border border-slate-200/80 p-8 text-center max-w-md mx-auto my-12">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3 text-indigo-600">
          🔒
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-1">Sign In Required</h3>
        <p className="text-xs text-slate-500">Please login to join the student community and view discussions.</p>
      </div>
    );
  }

  const username = user?.username || user?.firstName || "Student";

  return (
    <div className="min-h-full pb-12">
      {/* Community Header Banner */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
              Peer Study & Doubt Forum
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Student Community Hub
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Discuss complex formulas, solve tricky entrance MCQs, and share study tips.
            </p>
          </div>

          <PostButton onClick={() => setShowPopup(true)} />
        </div>
      </div>

      {/* Quick Create Prompt Card */}
      <div className="max-w-6xl mx-auto mb-6">
        <div
          onClick={() => setShowPopup(true)}
          className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-sm">
            {username.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-400 font-medium transition-colors">
            Have a doubt or study tip to share with fellow students, {username}? Click to post...
          </div>
          <button
            type="button"
            className="hidden sm:inline-flex items-center gap-1 px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-semibold text-xs rounded-xl transition-colors"
          >
            Create Post
          </button>
        </div>
      </div>

      {/* Post Popup Modal */}
      {showPopup && (
        <PostPopup
          onClose={() => setShowPopup(false)}
          onPostSuccess={handlePostSuccess}
        />
      )}

      {/* User Posts Feed */}
      <UserPosts posts={posts} setPosts={setPosts} />
    </div>
  );
}