import { SSRProvider, Provider, defaultTheme } from "@adobe/react-spectrum";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "@react-spectrum/toast";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SSRProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Provider theme={defaultTheme}>
            <ToastContainer />
            <Component {...pageProps} />
          </Provider>
        </Hydrate>
      </QueryClientProvider>
    </SSRProvider>
  );
}
