"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);

      localStorage.setItem("token", data.token);
      router.push("/dashboard");
      
    } catch (error) {
      console.log(error);

      alert("Bir hata oluştu");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            Saha Satış
          </h1>

          <p className="text-gray-300">
            Yönetim Paneline Giriş Yap
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              E-posta
            </label>

            <input
              type="email"
              placeholder="ornek@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Şifre
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:border-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold p-4 rounded-xl shadow-lg"
          >
            Giriş Yap
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Saha Satış Sistemi © 2026
        </div>
      </div>
    </div>
  );
}