import React from "react";
import type { Preferences } from "../../../types/onboarding.types";

interface PreferencesStepProps {
  data: Preferences;
  onChange: (data: Preferences) => void;
}

export const PreferencesStep: React.FC<PreferencesStepProps> = ({
  data,
  onChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Preferences
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Customize your experience
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="theme"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Theme Preference
          </label>
          <select
            id="theme"
            value={data.theme}
            onChange={(e) =>
              onChange({ ...data, theme: e.target.value as "Light" | "Dark" })
            }
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-gray-700 dark:text-white"
          >
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
          </select>
        </div>

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="newsletter"
            checked={data.newsletter}
            onChange={(e) =>
              onChange({ ...data, newsletter: e.target.checked })
            }
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
          />
          <div>
            <label
              htmlFor="newsletter"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Subscribe to newsletter
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Get updates about new features and product announcements
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
