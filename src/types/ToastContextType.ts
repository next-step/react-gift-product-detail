import type { StateHook } from "@src/hooks/stateHookType";

export type ToastContextType = {
  message: StateHook<string | null>;
} | null;
