import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/router';
import { AuthProvider } from '@/contexts/AuthContext';
import { Suspense } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import LoadingSpinner from '@/components/common/LoadingSpinner';

function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <RouterProvider router={router} />
        </Suspense>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;
