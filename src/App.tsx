import { queryClient } from "@/query-client";
import Router from "@/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router />
        <ToastContainer
          position="bottom-center"
          autoClose={1500}
          hideProgressBar={true}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </QueryClientProvider>
    </>
  );
};

export default App;
