import { useState, useCallback } from "react";

export function useStorageState<T>(key: string, initialValue?: T) {
  const [state, setState] = useState<T | undefined>(() => {
    const stored = localStorage.getItem(key);
    if (stored !== null) {
      try {
        return JSON.parse(stored) as T;
      } catch {
        return initialValue;
      }
    }
    return initialValue;
  });

  const setStorageState = useCallback(
    (value: T | undefined) => {
      setState(value);
      if (value === undefined) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    },
    [key]
  );

  return [state, setStorageState] as const;
}
