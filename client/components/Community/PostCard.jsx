import { useState } from "react";
import {
  likePost,
  unlikePost,
  getComments,
  addComment,
  updateCommunityPost,
  deleteCommunityPost,
} from "../../services/community";
import {
  FaEdit,
  FaTrash,
  FaHeart,
  FaRegHeart,
  FaComment,
} from "react-icons/fa";
import PostComments from "./PostComments";
import PostEditForm from "./PostEditForm";

export default function PostCard({
  post,
  currentUser,
  onPostUpdate,
  onPostDelete,
}) {
  const postId = post.id || post._id;

  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [commentsCount, setCommentsCount] = useState(post.comments_count);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(post.is_liked_by_me || false);
  const [loading, setLoading] = useState(false);

  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content || "");
  const [newImages, setNewImages] = useState([]);

  const toggleComments = async () => {
    if (!showComments) {
      try {
        const data = await getComments(postId);
        setComments(data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    }
    setShowComments(!showComments);
  };

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (liked) {
        await unlikePost(postId);
        setLikesCount((prev) => prev - 1);
        setLiked(false);
      } else {
        await likePost(postId);
        setLikesCount((prev) => prev + 1);
        setLiked(true);
      }
    } catch (err) {
      console.error("Like/unlike error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      const newComment = await addComment(postId, commentText);
      setComments((prev) => [...prev, newComment]);
      setCommentsCount((prev) => prev + 1);
      setCommentText("");
      setShowComments(true);
    } catch (err) {
      console.error("Add comment error:", err);
    }
  };

  const handleEditSave = async () => {
    try {
      const updatedPost = await updateCommunityPost(
        postId,
        editContent,
        newImages
      );
      if (onPostUpdate) onPostUpdate(updatedPost);
      setNewImages([]);
      setEditing(false);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await deleteCommunityPost(postId);
      if (onPostDelete) onPostDelete(postId);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const isAuthor = currentUser && currentUser.id === post.author.id;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
      {/* Top: Author + Actions */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-sm">
            {post.author.username[0].toUpperCase()}
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm">
              {post.author.username}
            </div>
            <div className="text-[11px] font-medium text-slate-400">
              {post.created_at?.split("T")[0] || "Just now"}
            </div>
          </div>
        </div>

        {isAuthor && !editing && (
          <div className="flex space-x-2 text-gray-500">
            <button
              onClick={() => {
                setEditing(true);
                setNewImages([]);
              }}
              className="hover:text-blue-600 p-1"
              title="Edit Post"
            >
              <FaEdit />
            </button>
            <button
              onClick={handleDelete}
              className="hover:text-red-600 p-1"
              title="Delete Post"
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>

      {/* Content / Edit Form */}
      <div className="mb-3 text-gray-800 min-h-[50px]">
        {editing ? (
          <PostEditForm
            editContent={editContent}
            setEditContent={setEditContent}
            setNewImages={setNewImages}
            onSave={handleEditSave}
            onCancel={() => {
              setEditing(false);
              setNewImages([]);
            }}
          />
        ) : (
          post.content || " "
        )}
      </div>

      {/* Post Images */}
      <div className="mb-3 min-h-[200px]">
        {post.images && post.images.length > 0 ? (
          post.images.length === 1 ? (
            <img
              src={post.images[0]}
              alt="Post Image"
              className="w-full max-h-[350px] object-cover rounded-lg shadow-sm hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {post.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Post Image ${idx + 1}`}
                  className="w-full h-60 object-cover rounded-lg hover:scale-105 transition-transform duration-200"
                />
              ))}
            </div>
          )
        ) : (
          <div className="h-[10px]" />
        )}
      </div>

      {/* Like & Comment Bar */}
      <div className="flex flex-col mt-3">
        <div className="flex items-center text-slate-500 text-xs mb-2 border-t border-slate-100 pt-3">
          <button
            onClick={handleLike}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg font-semibold hover:bg-rose-50 transition-colors ${
              liked ? "text-rose-600 bg-rose-50/60" : "hover:text-rose-600"
            }`}
          >
            {liked ? (
              <FaHeart className="w-4 h-4 text-rose-600" />
            ) : (
              <FaRegHeart className="w-4 h-4" />
            )}
            <span>{liked ? "Liked" : "Like"}</span>
            <span className="text-[11px] opacity-75">({likesCount})</span>
          </button>

          <button
            onClick={toggleComments}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg font-semibold hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <FaComment className="w-3.5 h-3.5" />
            <span>Discussion</span>
            <span className="text-[11px] opacity-75">({commentsCount})</span>
          </button>
        </div>

        {showComments && (
          <PostComments
            comments={comments}
            commentText={commentText}
            setCommentText={setCommentText}
            onAddComment={handleAddComment}
          />
        )}
      </div>
    </div>
  );
}
