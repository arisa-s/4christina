import { useEffect, useRef, MutableRefObject } from "react";

/**
 * Custom hook to detect clicks outside of a component.
 *
 * @param handler - Function to handle clicks outside the component.
 * @returns A MutableRefObject to be attached to the target component.
 */
function useClickOutside<T extends HTMLElement>(handler: (event: MouseEvent | TouchEvent) => void): MutableRefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // If clicking the ref's element or its descendants, do nothing
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event); // Trigger the handler when click is outside
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [handler]);

  return ref;
}

export default useClickOutside;
