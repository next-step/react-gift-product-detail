import type { StateHook } from "@src/hooks/stateHookType";

export type UserContextType = {
  authToken: StateHook<string | null>;
  user: StateHook<string | null>;
  email: StateHook<string | null>;
} | null;
