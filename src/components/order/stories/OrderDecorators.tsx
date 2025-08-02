import { Container } from "@/components/layout/Container";
import { OrderProvider } from "@/contexts/order/OrderProvider";
import type { ComponentType } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/query-client";
import { OverlayProvider } from "@/contexts/overlay/OverlayProvider";

export const OrderDecorator = (Story: ComponentType) => (
  <QueryClientProvider client={queryClient}>
    <OverlayProvider>
      <OrderProvider>
        <Container>
          <Story />
        </Container>
      </OrderProvider>
    </OverlayProvider>
  </QueryClientProvider>
);
