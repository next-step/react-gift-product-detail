import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";

export function useLoginContext() {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error(
      "useLoginContext는 LoginProvider 안에서만 사용해야 합니다.",
    );
  }
  return context;
} 