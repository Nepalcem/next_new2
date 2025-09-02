"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navigation from "@/components/navigation/Navigation";

export default function CTRPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="p-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">CTR Management</h1>


        {/* CTR Table Placeholder */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">CTR Records</h2>
          </div>
          <div className="p-6">
            <div className="text-center text-gray-500 py-8">

            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex gap-4">
          <button className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition cursor-pointer">
            Add New CTR
          </button>
        </div>
      </div>
    </div>
  );
}
