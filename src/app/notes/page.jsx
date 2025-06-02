"use client";

import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`);
        const data = await response.json();
        if (data.code === 200) {
          setNotes(data.data.notes);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt.decode(token);
        setUserId(decoded.userId);
      } catch (error) {
        console.error("Token tidak valid:", error);
      }
    }

    fetchNotes();
  }, []);

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white">
      <h1 className="text-4xl font-bold text-black text-center mb-10 drop-shadow-lg">
        Daftar Catatan Kamu
      </h1>

      {loading ? (
        <p className="text-white text-center">Memuat catatan...</p>
      ) : notes.length === 0 ? (
        <p className="text-white text-center">Belum ada catatan yang tersedia.</p>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white bg-opacity-90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{note.title}</h2>
              <p className="text-gray-700">{note.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesPage;