import { useState } from "react";
import { createPortal } from "react-dom";
import { FiEdit, FiSave, FiX, FiTrash2 } from "react-icons/fi";

function MoreModel({ data, onClose, onSave, onDelete }) {
  if (!data) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [edit, setEdit] = useState({
    id: data.id,
    heading: data.heading,
    discription: data.discription,
  });

  const handleSave = () => {
    if (!edit.heading || !edit.discription) {
      alert("Both fields are required!");
      return;
    }
    onSave({
      ...data,
      heading: edit.heading,
      discription: edit.discription,
    });
    setIsEditing(false);
  };

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/20 backdrop-blur-sm p-4">
      <div className="bg-[#fff9f4] rounded-3xl shadow-2xl w-full max-w-md border border-[#e5d8d0] overflow-hidden animate-scaleIn font-serif">
        
      
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#e5d8d0]">
          <h2 className="text-xl font-semibold text-[#5a3e36] tracking-wide truncate">
            {isEditing ? "Edit Journal Entry" : data.heading}
          </h2>
          <div className="flex items-center gap-3">
            {onDelete && !isEditing && (
              <button
                onClick={() => onDelete(data.id)}
                className="text-red-500 hover:text-red-600 transition"
                title="Delete"
              >
                <FiTrash2 size={20} />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition"
              title="Close"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

     
        <div className="px-6 py-5">
          {isEditing ? (
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={edit.heading}
                onChange={(e) => setEdit({ ...edit, heading: e.target.value })}
                placeholder="Title of your memory..."
                className="border border-[#d3bfa0] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#c28f65] transition placeholder:text-[#a07b64]"
              />
              <textarea
                value={edit.discription}
                onChange={(e) =>
                  setEdit({ ...edit, discription: e.target.value })
                }
                placeholder="Write your memory..."
                className="border border-[#d3bfa0] rounded-lg p-3 h-44 resize-none focus:outline-none focus:ring-2 focus:ring-[#c28f65] transition placeholder:text-[#a07b64] leading-relaxed"
              />
            </div>
          ) : (
            <div className="prose prose-sm sm:prose lg:prose-lg max-w-full text-[#4b3a2d]">
              <p className="leading-relaxed whitespace-pre-wrap">"{data.discription}"</p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 bg-[#f8f0e8] border-t border-[#e5d8d0]">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-[#00b894] hover:bg-[#0ca98a] text-white px-5 py-2 rounded-lg shadow-sm transition"
              >
                <FiSave /> Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 bg-[#e5d8d0] hover:bg-[#d3bfa0] text-[#5a3e36] px-5 py-2 rounded-lg transition"
              >
                <FiX /> Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-[#00b894] hover:bg-[#0ca98a] text-white px-5 py-2 rounded-lg shadow-sm transition"
            >
              <FiEdit /> Edit
            </button>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default MoreModel;
