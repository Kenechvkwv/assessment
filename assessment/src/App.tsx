import React, { useState } from "react";
import { OnboardingModal } from "./components/onboarding";
import type { FormData } from "./types/onboarding.types";
import { useDarkMode } from "./hooks/useDarkMode";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [completedData, setCompletedData] = useState<FormData | null>(null);
  const { isDark, toggleDarkMode, setDarkMode } = useDarkMode();

  const handleComplete = (data: FormData) => {
    setCompletedData(data);
    // Apply the selected theme immediately
    setDarkMode(data.preferences.theme === "Dark");
    console.log("Onboarding completed:", data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mr-4">
            Multi-Step Onboarding Demo
          </h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-200"
            title="Toggle dark mode"
          >
            {isDark ? <span>🌙</span> : <span>☀️</span>}
          </button>
        </div>

        {!completedData ? (
          <div>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Click the button below to start the onboarding process
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Start Onboarding
            </button>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg max-w-md mx-auto">
            <div className="text-green-600 dark:text-green-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome aboard!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your account has been created successfully.
            </p>
            <div className="text-left text-sm text-gray-500 dark:text-gray-400 space-y-1">
              <p>
                <strong>Name:</strong> {completedData.personalInfo.fullName}
              </p>
              <p>
                <strong>Email:</strong> {completedData.personalInfo.email}
              </p>
              <p>
                <strong>Username:</strong> {completedData.accountSetup.username}
              </p>
              <p>
                <strong>Theme:</strong> {completedData.preferences.theme}
              </p>
              <p>
                <strong>Newsletter:</strong>{" "}
                {completedData.preferences.newsletter ? "Yes" : "No"}
              </p>
            </div>
            <button
              onClick={() => {
                setCompletedData(null);
                setIsModalOpen(true);
              }}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      <OnboardingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onComplete={handleComplete}
      />
    </div>
  );
};

export default App;
