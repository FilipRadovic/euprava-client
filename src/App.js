import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import {Provider} from "react-redux";
import store from "./app/store";
import {QueryClientProvider} from "@tanstack/react-query/src/QueryClientProvider";
import {QueryClient} from "@tanstack/react-query";

const queryClient = new QueryClient()

// ----------------------------------------------------------------------

export default function App() {
  return (
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <HelmetProvider>
                <BrowserRouter>
                    <ThemeProvider>
                        <ScrollToTop />
                        <StyledChart />
                        <Router />
                    </ThemeProvider>
                </BrowserRouter>
            </HelmetProvider>
        </QueryClientProvider>
    </Provider>
  );
}
