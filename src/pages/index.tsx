import Head from 'next/head';
import styles from './home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | i.Fix</title>
      </Head>

      <h1 className={styles.Onome}>Para fazer</h1>
    </>
  );
}
