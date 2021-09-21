import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { DAppProvider } from "@usedapp/core";
import { DefaultSeo } from "next-seo";
import theme from "../theme";
import SEO from "../../next-seo.config";

const config = {
  supportedChains: [250, 56],
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={config}>
      <ChakraProvider resetCSS theme={theme}>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </ChakraProvider>
    </DAppProvider>
  );
}

export default MyApp;
