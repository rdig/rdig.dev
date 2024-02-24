"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "react-feather";

import { Theme } from "@types";

// Force both client and server content to be the same (although a bit ham fisted)
// See: https://github.com/facebook/react/issues/17741#issuecomment-868993771 for details
const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const hasMounted = useHasMounted();

  return (
    <button
      onClick={() => setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light)}
      className="w-6 h-6 flex items-center justify-center active:opacity-80"
      title="Toggle mode"
    >
      <span className="sr-only">Toggle mode</span>
      {hasMounted && theme !== Theme.Dark ? <Moon /> : <Sun />}
    </button>
  );
}
