import React, { type PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";

import { theme } from "@/app/theme";

import { ModalProvider } from "@/shared/context/ModalContext";

import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, type RenderOptions } from "@testing-library/react";

const createQueryClientFixture = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                staleTime: 0,
                gcTime: 0,
            },
            mutations: {
                retry: false,
            },
        },
    });

const TestProvidersFixture = ({ children }: PropsWithChildren) => {
    const queryClient = createQueryClientFixture();

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <ModalProvider>{children}</ModalProvider>
                </ThemeProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
};

const renderWithProviders = (ui: React.ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
    render(ui, { wrapper: TestProvidersFixture, ...options });

export * from "@testing-library/react";
export { renderWithProviders as render };
