import React, { useState } from "react";
import { PersonalInfoStep } from "./steps/PersonalInfoStep";
import { AccountSetupStep } from "./steps/AccountSetupStep";
import { PreferencesStep } from "./steps/PreferencesStep";
import type { FormData, ValidationErrors } from "../../types/onboarding.types";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: FormData) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: { fullName: "", email: "" },
    accountSetup: { username: "", password: "" },
    preferences: { theme: "Dark", newsletter: false },
  });

  const [errors, setErrors] = useState<ValidationErrors>({
    personalInfo: {},
    accountSetup: {},
  });

  // Validation functions
  const validatePersonalInfo = (): boolean => {
    const newErrors: Partial<FormData["personalInfo"]> = {};

    if (!formData.personalInfo.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.personalInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.personalInfo.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors((prev) => ({ ...prev, personalInfo: newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateAccountSetup = (): boolean => {
    const newErrors: Partial<FormData["accountSetup"]> = {};

    if (!formData.accountSetup.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.accountSetup.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }

    if (!formData.accountSetup.password) {
      newErrors.password = "Password is required";
    } else if (formData.accountSetup.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors((prev) => ({ ...prev, accountSetup: newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  // Navigation handlers
  const handleNext = () => {
    let isValid = true;

    if (currentStep === 1) {
      isValid = validatePersonalInfo();
    } else if (currentStep === 2) {
      isValid = validateAccountSetup();
    }

    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onComplete(formData);
    onClose();
  };

  const handleTabClick = (step: number) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  if (!isOpen) return null;

  const steps = [
    { number: 1, title: "Personal Info", completed: currentStep > 1 },
    { number: 2, title: "Account Setup", completed: currentStep > 2 },
    { number: 3, title: "Preferences", completed: false },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header with progress stuff */}
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b dark:border-gray-600">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Create Your Account
            </h1>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* actual progress tabs */}
          <div className="flex space-x-1">
            {steps.map((step) => (
              <button
                key={step.number}
                onClick={() => handleTabClick(step.number)}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentStep === step.number
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-2 border-blue-200 dark:border-blue-700"
                    : step.completed
                    ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800"
                    : "bg-white dark:bg-gray-600 text-gray-500 dark:text-gray-300 border border-gray-200 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-500"
                }`}
                disabled={step.number > currentStep}
              >
                <div className="flex items-center justify-center space-x-2">
                  {step.completed ? (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <span className="text-xs">{step.number}</span>
                  )}
                  <span>{step.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content area */}
        <div className="p-8 overflow-y-auto max-h-96">
          <div className="transition-all duration-300 ease-in-out">
            {currentStep === 1 && (
              <PersonalInfoStep
                data={formData.personalInfo}
                onChange={(data) =>
                  setFormData((prev) => ({ ...prev, personalInfo: data }))
                }
                errors={errors.personalInfo}
              />
            )}

            {currentStep === 2 && (
              <AccountSetupStep
                data={formData.accountSetup}
                onChange={(data) =>
                  setFormData((prev) => ({ ...prev, accountSetup: data }))
                }
                errors={errors.accountSetup}
              />
            )}

            {currentStep === 3 && (
              <PreferencesStep
                data={formData.preferences}
                onChange={(data) =>
                  setFormData((prev) => ({ ...prev, preferences: data }))
                }
              />
            )}
          </div>
        </div>

        {/* Footer with navigation buttons */}
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t dark:border-gray-600 flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Back
          </button>

          <div className="flex space-x-3">
            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              >
                Complete Setup
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
