import { useRef, useCallback } from "react";

const usePreservedCallback = <TArgs extends readonly unknown[], TReturn>(
  callback: (...args: TArgs) => TReturn,
): ((...args: TArgs) => TReturn) => {
  const callbackRef = useRef<(...args: TArgs) => TReturn>(callback);
  callbackRef.current = callback;

  return useCallback(
    (...args: TArgs): TReturn => callbackRef.current(...args),
    [],
  );
};

export default usePreservedCallback;
