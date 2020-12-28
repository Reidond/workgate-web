import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import NavBar from "../components/Navbar";
import "katex/dist/katex.min.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Workgate</title>
        <link rel="icon" href="/favicon.svg" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script
          type="text/javascript"
          src="https://cdn.bokeh.org/bokeh/release/bokeh-2.2.3.min.js"
          integrity="sha384-T2yuo9Oe71Cz/I4X9Ac5+gpEa5a8PpJCDlqKYO0CfAuEszu1JrXLl8YugMqYe3sM"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://cdn.bokeh.org/bokeh/release/bokeh-widgets-2.2.3.min.js"
          integrity="sha384-98GDGJ0kOMCUMUePhksaQ/GYgB3+NH9h996V88sh3aOiUNX3N+fLXAtry6xctSZ6"
          crossOrigin="anonymous"
        ></script>
        <script
          type="text/javascript"
          src="https://cdn.bokeh.org/bokeh/release/bokeh-tables-2.2.3.min.js"
          integrity="sha384-89bArO+nlbP3sgakeHjCo1JYxYR5wufVgA3IbUvDY+K7w4zyxJqssu7wVnfeKCq8"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <NavBar />

      <main className="container-fluid">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
