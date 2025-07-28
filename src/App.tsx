import { RouterProvider } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";

import { queryClient } from "@/app/lib/query";
import { theme } from "@/app/theme";

import { AuthProvider } from "@/features/auth/context/AuthContext";

import { browserRouter } from "@/Router";
import { ThemeProvider } from "@emotion/react";
import { QueryClientProvider } from "@tanstack/react-query";

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <AuthProvider>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        transition={Bounce}
                    />
                    <RouterProvider router={browserRouter} />
                </AuthProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
