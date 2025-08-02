import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // Check if user has a preference in localStorage
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      return JSON.parse(saved);
    }
    // Default to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Update localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDark));
    
    // Update document class
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(!isDark);
  const setDarkMode = (dark: boolean) => setIsDark(dark);

  return { isDark, toggleDarkMode, setDarkMode };
};