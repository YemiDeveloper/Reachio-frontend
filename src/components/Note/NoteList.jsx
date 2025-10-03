import React from "react";
import { FiTrash2, FiEdit } from "react-icons/fi";

const NoteList = ({ notes, setNotes, onEdit, onDelete }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {notes.map((note) => (
        <div
          key={note.id}
          className="p-4 bg-white rounded-xl shadow-md flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 flex items-center justify-center text-white rounded-full ${note.badgeColor}`}>
              <note.badgeIcon />
            </div>
            <h3 className="font-bold text-lg">{note.title}</h3>
          </div>
          <p className="text-gray-600">{note.content}</p>
          <div className="flex space-x-3 mt-2">
            <button
              onClick={() => onEdit(note)}
              className="text-blue-600 flex items-center space-x-1"
            >
              <FiEdit /> <span>Edit</span>
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className="text-red-600 flex items-center space-x-1"
            >
              <FiTrash2 /> <span>Delete</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
