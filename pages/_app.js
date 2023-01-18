

// import Layout from '../components/layout/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <link href="/dist/output.css" rel="stylesheet" />
      <Component {...pageProps} />
    </>


  );
}

export default MyApp;