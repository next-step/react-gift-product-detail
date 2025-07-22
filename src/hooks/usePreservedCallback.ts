import { useRef } from "react";

const usePreservedCallback = <TArgs extends readonly unknown[], TReturn>(
  callback: (...args: TArgs) => TReturn,
): ((...args: TArgs) => TReturn) => {
  const callbackRef = useRef<(...args: TArgs) => TReturn>(callback);
  const preservedCallback = useRef<((...args: TArgs) => TReturn) | null>(null);

  if (!preservedCallback.current) {
    preservedCallback.current = (...args: TArgs): TReturn => {
      return callbackRef.current(...args);
    };
  }
  return preservedCallback.current;
};

export default usePreservedCallback;
