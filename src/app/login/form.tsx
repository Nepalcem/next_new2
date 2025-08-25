"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2 className="text-2xl font-bold mb-4">Login Page</h2>
      <div style={{ marginBottom: 12 }}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", border: "1px solid #ccc" }}
          autoComplete="true"
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", border: "1px solid #ccc" }}
          autoComplete="true"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-violet-400 rounded-2xl px-4 py-2 text-white hover:bg-violet-500 transition cursor-pointer"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      {message && <p style={{ marginTop: 16, color: "red" }}>{message}</p>}
    </form>
  );
}
