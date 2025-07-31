import { Container } from "@/components/layout/Container";
import type { ComponentType } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/query-client";
import { MemoryRouter } from "react-router-dom";

export const LoginDecorator = (Story: ComponentType) => (
  <QueryClientProvider client={queryClient}>
    <MemoryRouter>
      <Container>
        <Story />
      </Container>
    </MemoryRouter>
  </QueryClientProvider>
);
