import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <nav className={styles.unauthorizedNav}>
        <Link href="#" className="button button-outline">
          Log in
        </Link>
      </nav>
      <main className={styles.main}>
        <h2 className={styles.title}>
          Dive into web3 by completing quests and earn rewards
        </h2>
        <h5 className={styles.offer}>
          Does not have an account? Complete your first quest about finance
          fundamentals to feel what is like to be a CleWer
        </h5>
        <div className={styles.heroHook}>
          <a href="#" className="button button-accent">
            Start quest
          </a>
        </div>
      </main>
    </>
  );
}
