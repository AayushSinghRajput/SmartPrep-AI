import { useEffect, useState } from "react";
import PostCard from "../../components/Community/PostCard";
import { getAllPosts } from "../../services/community";
import { useAuth } from "../../context/AuthContext";
import { FiUsers, FiMessageSquare } from "react-icons/fi";
import Loader from "../../components/ui/Loader";

export default function CommunityPage() {
  const [posts, setPosts] = useState([]);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, [user]);

  if (loading) return <Loader />;

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center max-w-xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-3">
            <FiUsers className="w-3.5 h-3.5" /> Peer Discussion Network
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Student Community Forum
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Share study insights, ask doubt questions, and collaborate with fellow +2 Science students.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-md mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
              <FiMessageSquare size={22} />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">No Posts Found</h3>
            <p className="text-xs text-slate-500">Be the first to start a study discussion in the forum.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard
                key={`post-${post.id || post._id}`}
                post={post}
                currentUser={user}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}