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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {AppInitializer} from "./providers/AppInitializer";

const queryClient = new QueryClient()

// ----------------------------------------------------------------------

export default function App() {
  return (
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <AppInitializer>
                <HelmetProvider>
                    <BrowserRouter>
                        <ThemeProvider>
                            <ScrollToTop />
                            <StyledChart />
                            <Router />
                        </ThemeProvider>
                    </BrowserRouter>
                </HelmetProvider>
            </AppInitializer>
        </QueryClientProvider>
    </Provider>
  );
}
