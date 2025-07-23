import { createStorage } from "@/utils/createStorage";
import { useState } from "react";

const useSessionStorage = <T>(key: string, initialValue: T) => {
  const userInfoStorage = createStorage<T>(key);
  const [value, setValue] = useState<T>(() => {
    try {
      const item = userInfoStorage.get();
      return item ? item : initialValue;
    } catch {
      return initialValue;
    }
  });

  const updateValue = (value: T) => {
    setValue(value);
    userInfoStorage.set(value);
  };

  const removeValue = () => {
    setValue(initialValue);
    userInfoStorage.remove();
  };

  return { value, updateValue, removeValue };
};

export default useSessionStorage;
