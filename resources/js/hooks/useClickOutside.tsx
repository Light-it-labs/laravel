import { useEffect, useRef } from "react";

// Be sure to use useCallback w whatever callback is being passed as params
// unless you want the useEffect to trigger on every render
export const useClickOutside = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [callback]);

  return ref;
};
