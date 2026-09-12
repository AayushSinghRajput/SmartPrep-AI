"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { createPost } from "../../services/community"; // API function to create post

/**
 * Popup modal to submit a new post with optional images
 */
export default function PostPopup({ onClose, onPostSuccess }) {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]); // store selected files
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files)); // convert FileList to array
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim() && images.length === 0) {
      toast.error("Post cannot be empty");
      return;
    }

    setLoading(true);

    try {
      // Prepare FormData to send content + images
      const formData = new FormData();
      formData.append("content", content);
      images.forEach((img) => formData.append("images", img)); // multiple images support

      const data = await createPost(formData); // API expects FormData
      toast.success("Post created successfully!");
      onPostSuccess(data);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl w-full max-w-lg p-6 sm:p-8 relative">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Create Community Post</h2>
            <p className="text-xs text-slate-500">Ask a question or share prep tips with fellow students.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Post content */}
          <textarea
            placeholder="What's on your mind? (e.g., How do you solve rotational dynamics Q4?)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none"
            rows={4}
          />

          {/* Image upload */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Attach Diagrams or Question Photos (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl shadow-sm transition-all"
            >
              {loading ? "Posting..." : "Publish Post"}
            </button>
          </div>
        </form>

        {/* Preview selected images */}
        {images.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-slate-100">
            {images.map((img, idx) => (
              <div key={idx} className="w-16 h-16 overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                <img
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
