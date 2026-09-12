export default function PostComments({
  comments,
  commentText,
  setCommentText,
  onAddComment,
}) {
  return (
    <div className="mt-3">
      {comments.map((c) => (
        <div
          key={c.id || c._id}
          className="flex items-start space-x-2 mb-2 bg-gray-50 p-2 rounded-lg"
        >
          <div className="w-9 h-9 p-2 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-gray-700 text-sm">
            {c.user.username[0].toUpperCase()}
          </div>
          <div>
            <span className="font-semibold text-gray-800">
              {c.user.username}
            </span>
            : <span className="text-gray-700">{c.text}</span>
          </div>
        </div>
      ))}

      <div className="flex items-center mt-2 space-x-2">
        <label htmlFor="community-comment-input" className="sr-only">
          Write a comment
        </label>
        <input
          id="community-comment-input"
          aria-label="Write a comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          onClick={onAddComment}
          aria-label="Post comment"
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 font-semibold"
        >
          Post
        </button>
      </div>
    </div>
  );
}
