import { Global } from "@emotion/react";
import { reset } from "@/styles/reset";
import { globalStyle } from "@/styles/globalStyle";
import Router from "@/routes/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Global styles={reset} />
      <Global styles={(theme) => globalStyle(theme)} />
      <Router />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        pauseOnHover
        closeOnClick
        draggable={false}
        theme="light"
      />
    </QueryClientProvider>
  );
}

export default App;
