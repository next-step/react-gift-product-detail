import type { ToastContextType } from "@src/types/ToastContextType";
import { createContext } from "react";

const ToastContext = createContext<ToastContextType>(null);

export default ToastContext;
