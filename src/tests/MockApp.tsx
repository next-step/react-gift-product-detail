import queryClient from "@src/apis/BackEnd/query/client";
import UserContext from "@src/contexts/UserContext";
import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

const MockApp = ({
  children,
  userContext = true,
  initialEntries = ["/"]
}: {
  children: ReactNode;
  userContext?: boolean;
  initialEntries?: string[];
}) => {
  const fakeUserContext = {
    authToken: { value: userContext ? "authToken" : null, setValue: vi.fn() },
    email: { value: userContext ? "test@kakao.com" : null, setValue: vi.fn() },
    user: { value: userContext ? "test" : null, setValue: vi.fn() }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={fakeUserContext}>
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </UserContext.Provider>
    </QueryClientProvider>
  );
};
export default MockApp;
