import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import custonTheme from "@/styles/theme";
import { LoginProvider } from "@/contexts/loginContext";
import { ToastProvider } from "@/contexts/toastContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={custonTheme}>
      <ToastProvider>
        <LoginProvider>
          <Component {...pageProps} />
        </LoginProvider>
      </ToastProvider>
    </ChakraProvider>
  );
}
