import React, { useState } from "react";
import { FiEdit3, FiBookOpen, FiStar,  } from "react-icons/fi";
import NoteForm from "../components/Note/NoteForm";
import NoteList from "../components/Note/NoteList";
import { useOutletContext } from "react-router-dom";



const badgeIcons = [FiStar, FiEdit3, FiBookOpen];
const badgeColors = ["bg-blue-500", "bg-green-400", "bg-orange-400", "bg-pink-500"];

const NotePage = () => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const { selectedBusiness,user } = useOutletContext();
  console.log(selectedBusiness,"1")
  console.log(user,"2")

  
  

  const handleAddOrUpdate = ({ title, content }) => {
    if (editingNote) {
      setNotes(
        notes.map((n) =>
          n.id === editingNote.id ? { ...n, title, content } : n
        )
      );
      setEditingNote(null);
    } else {
      setNotes([
        ...notes,
        {
          id: notes.length + 1,
          title,
          content,
          badgeColor:
            badgeColors[Math.floor(Math.random() * badgeColors.length)],
          badgeIcon:
            badgeIcons[Math.floor(Math.random() * badgeIcons.length)],
        },
      ]);
    }
  };

  return (
    <div className="p-4 md:p-10 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-purple-700">Ideas & Notes</h1>
      <NoteForm onSubmit={handleAddOrUpdate} editingNote={editingNote} business={selectedBusiness} email={user?.email}
  phone={user?.phoneNumber}/>
      <div className="bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 shadow-2xl rounded-3xl p-5 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold text-blue-700 mb-3">
          All Notes
        </h2>
        <NoteList
          notes={notes}
          setNotes={setNotes}
          onEdit={setEditingNote}
          onDelete={(id) => setNotes(notes.filter((n) => n.id !== id))}
        />
      </div>
    </div>
  );
};

export default NotePage;
