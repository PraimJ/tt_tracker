

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

//When using Next.js you’ll most likely need to override the global App component to get access to some 
//features like persisting state, or global layouts. This can be done by creating a file_app.js directly 
//in the ./pages/ folder. If this file exists, then Next.js will use this instead of the default App.

