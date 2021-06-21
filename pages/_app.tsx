import UniversalNoticeModal from "../components/notice/UniversalNoticeModal";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UniversalNoticeModal />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
