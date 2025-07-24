export function createStorage<T>(key: string) {
  return {
    get(): T | null {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    },
    set(value: T) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    remove() {
      localStorage.removeItem(key);
    },
  };
}

const storageMap = new Map<string, ReturnType<typeof createStorage>>();

export function getPersistentStorage<T>(key: string) {
  if (!storageMap.has(key)) {
    storageMap.set(key, createStorage<T>(key));
  }
  return storageMap.get(key)!;
}
