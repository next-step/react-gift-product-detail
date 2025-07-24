import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import { ReceiverProvider } from './providers/ReceiverProvider';
import router from './router/router';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AuthProvider>
      <ReceiverProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="bottom-center"
          closeOnClick
          closeButton={true}
          hideProgressBar={true}
        />
      </ReceiverProvider>
    </AuthProvider>
  );
}

export default App; 