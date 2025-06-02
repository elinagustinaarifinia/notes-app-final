"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import jwt from "jsonwebtoken";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreateNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (!savedToken) {
      router.push("/");
    } else {
      try {
        const decodedToken = jwt.decode(savedToken);
        setUser(decodedToken.userId);
        setToken(savedToken);
      } catch (error) {
        console.error("Error decoding token", error);
        router.push("/");
      }
    }
  }, [router]);

  const handleCreate = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        variant: "destructive",
        title: "Gagal menyimpan",
        description: "Judul dan isi tidak boleh kosong.",
      });
      return;
    }

    if (!token || !user) {
      toast({
        variant: "destructive",
        title: "Gagal menyimpan",
        description: "Token atau data pengguna tidak valid.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_user: user,
          title,
          content,
        }),
      });

      if (!res.ok) throw new Error("Gagal menambahkan catatan");

      toast({
        className: cn("bg-green-600", "text-white"),
        title: "Catatan dibuat",
        description: "Catatan berhasil ditambahkan.",
      });

      router.push("/notes");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal menyimpan",
        description: "Terjadi kesalahan saat menambahkan catatan.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 justify-center items-center min-h-screen p-6 bg-gray-50">
      <div className="bg-white bg-opacity-95 backdrop-blur-lg p-10 rounded-3xl shadow-xl max-w-2xl w-full border border-white/30">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8 tracking-wide drop-shadow-sm">
          Tambahkan Catatan Kamu Disini Ya
        </h1>

        <div className="space-y-6">
          <Input
            placeholder="Judul Catatan"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow rounded-lg shadow-md"
            autoFocus
          />
          <Textarea
            placeholder="Tulis isi catatan kamu di sini..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="text-gray-900 placeholder-gray-400 min-h-[180px] resize-none rounded-lg shadow-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow"
          />
          <div className="flex justify-center">
            <Button
              onClick={handleCreate}
              disabled={loading}
              className={cn(
                "text-lg text-white bg-black",
                "hover:text-white hover:bg-gradient-to-r hover:hover:to-black-500",
                "transition-all duration-200",
                loading && "opacity-50 cursor-not-allowed"
              )}
            >
              {loading ? "Menyimpan..." : "Simpan Catatan"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
