"use client";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="block my-8 text-4xl">TM - GA CRM</h1>
      <section className="flex items-center justify-center">
        <div className="w-[400px] bg-white p-8 rounded-lg shadow-lg">
          <div className="flex mb-6 relative">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2 px-4 text-center font-medium transition-all duration-500 ease-in-out cursor-pointer ${
                activeTab === "login"
                  ? "text-violet-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-2 px-4 text-center font-medium transition-all duration-500 ease-in-out cursor-pointer ${
                activeTab === "register"
                  ? "text-violet-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Register
            </button>
            {/* Animated underline */}
            <div
              className={`absolute bottom-0 h-0.5 bg-violet-600 transition-all duration-500 ease-in-out ${
                activeTab === "login" ? "left-0 w-1/2" : "left-1/2 w-1/2"
              }`}
            />
          </div>

          {/* Tab Content with Animation */}
          <div className="mb-6 relative overflow-hidden min-h-[360px]">
            <div
              className={`transition-all duration-500 ease-in-out transform ${
                activeTab === "login"
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0 absolute top-0 left-0 w-full"
              }`}
            >
              <LoginForm />
            </div>
            <div
              className={`transition-all duration-500 ease-in-out transform ${
                activeTab === "register"
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-full opacity-0 absolute top-0 left-0 w-full"
              }`}
            >
              <RegisterForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
