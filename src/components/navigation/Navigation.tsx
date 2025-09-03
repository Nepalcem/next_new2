"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navigation() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-sm border-b p-4 border-gray-300">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/dashboard" className="text-violet-600">
          <h1 className="block my-2 text-4xl font-bold">TM - GA CRM</h1>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/ctr"
            className="px-3 py-2 text-gray-700 hover:text-violet-600 transition"
          >
            CTR
          </Link>
          {session ? (
            <span className="text-gray-700">
              Welcome, {session?.user?.name || session?.user?.email}
            </span>
          ) : (
            ""
          )}
          <button
            onClick={() => signOut({ callbackUrl: "/authorization" })}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
