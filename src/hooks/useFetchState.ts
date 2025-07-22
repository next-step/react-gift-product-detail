import type { APIError } from "@src/apis/BackEnd/apiList";
import { useEffect, useState } from "react";

type DataState<T> = {
  status: "ready" | "pending" | "done" | "error";
  data: T | null;
  error?: APIError;
};

export default function useFetchState<T>(func: () => Promise<T>) {
  const [dataState, setDataState] = useState<DataState<T>>({
    status: "ready",
    data: null
  });

  useEffect(() => {
    const update = async () => {
      setDataState({ status: "pending", data: null });
      try {
        const result = await func();
        setDataState({ status: "done", data: result });
      } catch (e) {
        setDataState({ status: "error", data: null, error: e as APIError });
      }
    };

    update();
  }, [func]);

  return dataState;
}
