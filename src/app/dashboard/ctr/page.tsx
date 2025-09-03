"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import Navigation from "@/components/navigation/Navigation";
import CTRForm from "@/components/forms/CTR-form/CTRForm";
import { CTRRecord } from "@/types/app-types";

export default function CTRPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [ctrRecords, setCtrRecords] = useState<CTRRecord[]>([]);
  const [isLoadingRecords, setIsLoadingRecords] = useState(false);
  const hasFetchedRecords = useRef(false);

  const fetchCTRRecords = useCallback(async () => {
    setIsLoadingRecords(true);
    try {
      const response = await fetch("/api/ctr", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const records = await response.json();
        setCtrRecords(records);
        hasFetchedRecords.current = true;
      }
    } catch (error) {
      console.error("Error fetching CTR records:", error);
    } finally {
      setIsLoadingRecords(false);
    }
  }, []);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/authorization");
      return;
    }

    // Fetch CTR records if user role is "user" and we haven't fetched yet
    if (session.user?.role === "user" && !hasFetchedRecords.current) {
      fetchCTRRecords();
    }
  }, [session, status, fetchCTRRecords, router]);

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

        <CTRForm onSuccess={fetchCTRRecords} />

        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">CTR Records</h2>
          </div>
          <div className="p-6">
            {isLoadingRecords ? (
              <div className="text-center text-gray-500 py-8">
                <p>Loading CTR records...</p>
              </div>
            ) : ctrRecords.length > 0 ? (
              <div className="space-y-4">
                {ctrRecords.map((record) => (
                  <div key={record.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">
                        {record.source}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {new Date(record.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{record.description}</p>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>PTM: {record.ptm}</span>
                      <span>Time: {record.time_spent} min</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>No CTR records found for this month.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
