import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from '@/components/ErrorBoundary';
import AppPage from '@/pages/App';
import Callback from '@/pages/Callback';
import Landing from '@/pages/Landing';
import NotFound from '@/pages/NotFound';
import Privacy from '@/pages/Privacy';

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/app', element: <AppPage /> },
  { path: '/callback', element: <Callback /> },
  { path: '/privacy', element: <Privacy /> },
  { path: '*', element: <NotFound /> },
]);

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
