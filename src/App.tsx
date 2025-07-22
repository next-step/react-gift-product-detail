import "@src/App.css";
import Router from "@src/router/Router";
import UserContextProvider from "./contexts/UserContextProdiver";
import AliveCheckPanel from "./apis/AliveCheckPanel"; // for testing
import ToastContextProvider from "./contexts/ToastContextProdiver";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./apis/BackEnd/query/client";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContextProvider>
        <UserContextProvider>
          <AliveCheckPanel /> {/* for testing */}
          <Router />
        </UserContextProvider>
      </ToastContextProvider>
    </QueryClientProvider>
  );
}

export default App;
