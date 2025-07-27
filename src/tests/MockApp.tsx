import queryClient from "@src/apis/BackEnd/query/client";
import UserContext from "@src/contexts/UserContext";
import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

const MockApp = ({
  children,
  userContext = true
}: {
  children: ReactNode;
  userContext?: boolean;
}) => {
  const fakeUserContext = {
    authToken: { value: userContext ? "authToken" : null, setValue: vi.fn() },
    email: { value: userContext ? "test@kakao.com" : null, setValue: vi.fn() },
    user: { value: userContext ? "test" : null, setValue: vi.fn() }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserContext.Provider value={fakeUserContext}>
          {children}
        </UserContext.Provider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
export default MockApp;
