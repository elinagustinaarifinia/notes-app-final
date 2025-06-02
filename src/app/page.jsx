"use client";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";

import Card from "@/components/my-components/Card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoggedIn(false);
    } else {
      try {
        const decodedToken = jwt.decode(token);
        if (decodedToken && decodedToken.userId) {
          setIsLoggedIn(true);
          setUserName(decodedToken.username || "Pengguna");
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Token decoding error:", error);
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleCreateNote = () => {
    if (isLoggedIn) {
      router.push("/notes/create");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col gap-10 justify-center items-center min-h-screen p-6 bg-gray-50">
      <div className="flex flex-col items-center gap-8 mt-20">
        <h1 className="text-center text-6xl font-bold text-blue-600">
          Welcome to NotesApp
        </h1>


        <p className="text-slate-800 text-center text-lg italic max-w-xl">
          A simple and powerful note-taking app for your everyday thoughts.
        </p>

        <Button
          variant="outline"
          size="lg"
          onClick={handleCreateNote}
          className="text-lg border-blue-200 text-blue-800 hover:text-blue-800 hover:bg-blue-50"
        >
          Buat Catatan Baru
        </Button>
      </div>

      <div className="mt-16 w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <Card
            title="Create Notes"
            content="Create and organize your notes with ease. Add title and content to each note."
          />
          <Card
            title="View Notes"
            content="Browse all your notes and find them easily whenever you need."
          />
          <Card
            title="Edit Notes"
            content="Update and modify your notes whenever needed with just a few clicks."
          />
        </div>
      </div>
    </div>
  );
}