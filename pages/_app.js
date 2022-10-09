import msgs from "site-settings/site-translations";
import { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { AuthContextProvider } from "context";
import { IntlProvider } from "react-intl";
import { MainLayout } from "layouts";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);
  const locale = "ar";

  const client = new ApolloClient({
    uri: "/api/graphql",
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) return null;

  return (
    <AuthContextProvider>
      <ApolloProvider client={client}>
        <IntlProvider locale={locale} messages={msgs[locale]}>
          <MainLayout>
            {typeof window === undefined ? <></> : <Component {...pageProps} />}
          </MainLayout>
        </IntlProvider>
      </ApolloProvider>
    </AuthContextProvider>
  );
}
