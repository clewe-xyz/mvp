import Link from "next/link";
import styles from "./page.module.css";
import { isAuthorized } from "./api/authorizedRequest";

export default function Home() {
  return (
    <>
      <nav className={styles.unauthorizedNav}>
        {isAuthorized() ? (
          <Link href="/profile" className="button button-outline">
            Go to Profile
          </Link>
        ) : (
          <Link href="/login" className="button button-outline">
            Log in
          </Link>
        )}
      </nav>
      <main className={styles.main}>
        <h2 className={styles.title}>
          Dive into web3 by completing quests and earn rewards
        </h2>
        <h5 className={styles.offer}>
          Do not have an account? Complete your first quest about finance
          fundamentals and feel what is like to be a CleWer
        </h5>
        <div className={styles.heroHook}>
          <Link
            href="/quests/demo/preparation"
            className="button button-accent"
          >
            Start your first quest
          </Link>
        </div>
      </main>
    </>
  );
}
