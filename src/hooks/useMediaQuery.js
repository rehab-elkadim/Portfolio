import { useEffect, useState } from "react";

// Tracks a CSS media query and stays in sync as the viewport crosses it
// (e.g. resizing the window or rotating a device), not just at mount.
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    // The lazy useState initializer above already captures the value for
    // the current `query` on mount; this listener only needs to react to
    // future changes (a resize crossing the breakpoint).
    const onChange = (e) => setMatches(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
