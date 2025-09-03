"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navigation from "@/components/navigation/Navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading
    if (!session) {
      router.push("/authorization");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="p-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      {/* Dashboard Content */}
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

        <div className="mt-4 p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">User Info</h2>
          <p>
            <strong>Email:</strong> {session.user?.email}
          </p>
          <p>
            <strong>Role:</strong> {session.user?.role || "user"}
          </p>
          <p>
            <strong>UserId:</strong> {session.user?.id || "user"}
          </p>
        </div>
      </div>
    </div>
  );
}
