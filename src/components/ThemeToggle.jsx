"use client";

import { useEffect } from "react";
import { BsMoon, BsSun } from "react-icons/bs";

const ThemeToggle = () => {
  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !document.documentElement.classList.contains("dark");

    document.documentElement.classList.toggle("dark", nextIsDark);
    window.localStorage.setItem(
      "portfolio-theme",
      nextIsDark ? "dark" : "light",
    );
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle day and night mode"
      title="Toggle day and night mode"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-current transition-colors hover:text-accent"
    >
      <BsMoon aria-hidden="true" className="dark:hidden" />
      <BsSun aria-hidden="true" className="hidden dark:block" />
    </button>
  );
};

export default ThemeToggle;
