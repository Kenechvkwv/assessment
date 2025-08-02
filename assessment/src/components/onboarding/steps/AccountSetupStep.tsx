import React from "react";
import type { AccountSetup } from "../../../types/onboarding.types";

interface AccountSetupStepProps {
  data: AccountSetup;
  onChange: (data: AccountSetup) => void;
  errors: Partial<AccountSetup>;
}

export const AccountSetupStep: React.FC<AccountSetupStepProps> = ({
  data,
  onChange,
  errors,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Account Setup
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Create your account credentials
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Username *
          </label>
          <input
            type="text"
            id="username"
            value={data.username}
            onChange={(e) => onChange({ ...data, username: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 ${
              errors.username
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="Choose a username"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.username}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Password *
          </label>
          <input
            type="password"
            id="password"
            value={data.password}
            onChange={(e) => onChange({ ...data, password: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 ${
              errors.password
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="Create a secure password"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.password}
            </p>
          )}
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Password must be at least 8 characters long
          </p>
        </div>
      </div>
    </div>
  );
};
