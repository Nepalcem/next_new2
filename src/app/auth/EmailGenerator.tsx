"use client";
import { useState } from "react";

export default function EmailGenerator() {
  const [email, setEmail] = useState("");

  const generateEmail = () => {
    const randomString = Math.random().toString(36).substring(2, 8); // random letters/numbers
    const domains = ["gmail.com", "yahoo.com", "hotmail.com", "monster.com"];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];

    setEmail(`monster${randomString}@${randomDomain}`);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <button
        onClick={generateEmail}
        className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
      >
        Generate Email
      </button>

      {email && <p className="text-lg font-mono">{email}</p>}
    </div>
  );
}
