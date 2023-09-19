"use client";
import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
const ThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div>
      <button
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        {resolvedTheme === "dark" ? <FaSun /> : <FaMoon color="black" />}
      </button>
    </div>
  );
};

export default ThemeButton;
