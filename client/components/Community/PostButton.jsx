import { FiPlus } from "react-icons/fi";

/**
 * Button to open the post popup
 */
export default function PostButton({ onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
    >
      <FiPlus className="w-4 h-4" />
      <span>New Post</span>
    </button>
  );
}
