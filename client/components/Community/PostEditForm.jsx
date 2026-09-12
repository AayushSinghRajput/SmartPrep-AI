export default function PostEditForm({
  editContent,
  setEditContent,
  setNewImages,
  onSave,
  onCancel,
}) {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="post-edit-textarea" className="sr-only">
        Edit post content
      </label>
      <textarea
        id="post-edit-textarea"
        aria-label="Edit post content"
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
        rows={3}
      />
      <label htmlFor="post-edit-file-input" className="sr-only">
        Upload post images
      </label>
      <input
        id="post-edit-file-input"
        aria-label="Upload post images"
        type="file"
        multiple
        onChange={(e) => setNewImages(Array.from(e.target.files))}
        className="border border-gray-300 rounded-lg p-1"
      />
      <div className="flex space-x-2">
        <button
          onClick={onSave}
          aria-label="Save post changes"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 font-semibold"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          aria-label="Cancel post editing"
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
