import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { DAppProvider } from "@usedapp/core";
import { DefaultSeo } from "next-seo";
import theme from "../theme";
import SEO from "../../next-seo.config";
import Script from "next/script";

const config = {
  supportedChains: [250],
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={config}>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
      />

      <Script strategy="lazyOnload">
        {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'XXXXXXXXXX', {
        page_path: window.location.pathname,
      });
  `}
      </Script>
      <ChakraProvider resetCSS theme={theme}>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </ChakraProvider>
    </DAppProvider>
  );
}

export default MyApp;
