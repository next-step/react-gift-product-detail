import { Global } from "@emotion/react";
import { reset } from "@/styles/reset";
import { globalStyle } from "@/styles/globalStyle";
import Router from "@/routes/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { Suspense } from "react";
import { Spinner } from "./components/common/Spinner";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Global styles={reset} />
      <Global styles={(theme) => globalStyle(theme)} />

      <ErrorBoundary fallback={<p>~문제가 발생했습니다~</p>}>
        <Suspense fallback={<Spinner />}>
          <Router />
        </Suspense>
      </ErrorBoundary>
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
