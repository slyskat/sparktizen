import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import GlobalStyles from './styles/GlobalStyles';
import Landing from './pages/Landing';
import MainLayout from './ui/MainLayout';
import Checkout from './pages/Checkout';
import OrderReceipt from './pages/OrderReceipt';
import PageNotFound from './pages/PageNotFound';
import { DropProvider } from './contexts/DropContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <DropProvider>
        x
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order/:id" element={<OrderReceipt />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </DropProvider>
    </QueryClientProvider>
  );
}

export default App;
