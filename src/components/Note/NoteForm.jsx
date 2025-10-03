import React, { useState, useEffect } from "react";
import { FiMail, FiPhone, FiTag } from "react-icons/fi";

const TAGS = ["Content", "Order", "Meeting", "Other"];

const NoteForm = ({ onSubmit, editingNote, business, email,phone }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");

  

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setTag(editingNote.tag || "");
    }
  }, [editingNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !tag) return;

    onSubmit({ title, content, tag, email, phone });
    console.log(title, content, tag, email, phone ,'3')

    try {
      await fetch("https://oyekan-bolaji.app.n8n.cloud/webhook-test/80cddb31-b457-40bf-ab43-6bb583b12d50", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          tag,
          business,
          email,
          phone,
          createdAt: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("Failed to send to n8n:", err);
    }

    setTitle("");
    setContent("");
    setTag("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-gradient-to-br from-purple-50 via-white to-purple-100 shadow-2xl rounded-3xl p-6 md:p-8 space-y-6 border border-purple-200"
    >
      {/* Title Input */}
      <input
        type="text"
        placeholder="✨ Quick idea title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-400 focus:border-purple-500 transition"
      />

      {/* Content Area */}
      <textarea
        placeholder="📝 Add more details (optional)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-400 focus:border-purple-500 transition"
      />

      {/* Tag Selection */}
      <div>
        <p className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
          <FiTag /> Choose a Tag
        </p>
        <div className="flex gap-3 flex-wrap">
          {TAGS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(t)}
              className={`px-4 py-2 rounded-full font-medium transition shadow-sm ${
                tag === t
                  ? "bg-purple-600 text-white shadow-lg scale-105"
                  : "bg-gray-100 hover:bg-purple-100 text-gray-700 border"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* User Info (read-only preview) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl text-sm text-gray-700">
        <p className="flex items-center gap-2">
          <FiMail className="text-purple-600" /> {email || "No email found"}
        </p>
        <p className="flex items-center gap-2">
          <FiPhone className="text-purple-600" /> {phone || "No phone number"}
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl shadow-lg hover:bg-purple-700 transition transform hover:scale-[1.02]"
      >
        {editingNote ? "✏️ Update Idea" : "💡 Save Idea"}
      </button>
    </form>
  );
};

export default NoteForm;
