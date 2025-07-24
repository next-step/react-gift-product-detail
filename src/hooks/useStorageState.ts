import { useState, useEffect } from 'react';
import { getPersistentStorage } from '@/utils/storage';

export function useStorageState<T>(key: string, initialValue: T) {
  const storage = getPersistentStorage<T>(key);
  const [state, setState] = useState<T>(() => (storage.get() ?? initialValue) as T);

  const setValue = (value: T) => {
    setState(value);
    storage.set(value);
    window.dispatchEvent(new CustomEvent(`storage:${key}`, { detail: value }));
  };

  const removeValue = () => {
    setState(initialValue);
    storage.remove();
    window.dispatchEvent(new CustomEvent(`storage:${key}`, { detail: initialValue }));
  };

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<T>;
      setState(custom.detail);
    };
    window.addEventListener(`storage:${key}`, handler);
    return () => window.removeEventListener(`storage:${key}`, handler);
  }, [key]);

  return [state, setValue, removeValue] as const;
}
