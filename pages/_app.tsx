import { ApolloProvider } from "@apollo/client";
import UniversalNoticeModal from "../components/notice/UniversalNoticeModal";
import client from "../graphql/client";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <UniversalNoticeModal />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
