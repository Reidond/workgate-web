import { Button } from "@blueprintjs/core";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import NavBar from "../components/Navbar.tsx";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Workgate</title>
        <link rel="icon" href="/favicon.svg" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <NavBar />

      <main className={styles.main}>
        <Button intent="success" text="button content" />
      </main>
    </div>
  );
}
