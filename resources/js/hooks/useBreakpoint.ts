import { useLayoutEffect, useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";

// I don't like this 🥀
import tailwindConfig from "../../../tailwind.config";

const config = resolveConfig(tailwindConfig);

const screens = config.theme.screens;
type Breakpoint = keyof typeof screens;

function matches(breakpoint: Breakpoint) {
  const value = screens[breakpoint] ?? "999999px";
  const query = window.matchMedia(`(min-width: ${value})`);
  return query.matches;
}

export const useBreakpoint = (breakpoint: Breakpoint) => {
  const [match, setMatch] = useState(matches(breakpoint));

  useLayoutEffect(() => {
    if (!("matchMedia" in window)) return undefined;

    function track() {
      const aux = matches(breakpoint);
      if (aux !== match) {
        setMatch(aux);
      }
    }

    window.addEventListener("resize", track);
    return () => window.removeEventListener("resize", track);
  });

  return match;
};
