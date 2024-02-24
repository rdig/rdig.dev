"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "react-feather";

import { Theme } from "@types";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light)}
      className="w-6 h-6 flex items-center justify-center active:opacity-80">
      <span className="sr-only">Toggle mode</span>
      {theme !== Theme.Dark ? <Moon /> : <Sun />}
    </button>
  );
}
