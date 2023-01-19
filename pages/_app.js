

// import Layout from '../components/layout/Layout';
import '../styles/globals.css';
import { Fragment } from 'react';
import Navbar from '../components/UI/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <link href="/dist/output.css" rel="stylesheet" />
      <Navbar />
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;