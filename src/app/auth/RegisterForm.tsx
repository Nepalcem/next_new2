import { useState } from "react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // submit logic here...

    setLoading(false);
  };

  const generateEmail = () => {
    const randomString = Math.random().toString(36).substring(2, 8);
    const domains = ["gmail.com", "yahoo.com", "outlook.com"];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];

    setEmail(`monster${randomString}@${randomDomain}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-[98%] mx-auto block py-2 border border-gray-300 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          autoComplete="name"
        />
      </div>

      {/* Email with generator */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <div className="flex items-center gap-2 w-[98%] mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 py-2 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            autoComplete="email"
          />
          <button
            type="button"
            onClick={generateEmail}
            className="px-3 py-2 rounded-md bg-violet-600 text-white 
              hover:bg-violet-700 transition-colors cursor-pointer"
            title="Generate Email for testing purposes"
          >
            🎲
          </button>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-[98%] mx-auto block py-2 border border-gray-300 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          autoComplete="new-password"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-violet-600 rounded-md px-4 py-2 text-white 
          hover:bg-violet-700 transition-colors 
          disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? "Registering..." : "Register"}
      </button>

      {message && (
        <p className="mt-4 text-center text-red-600 text-sm">{message}</p>
      )}
    </form>
  );
}
