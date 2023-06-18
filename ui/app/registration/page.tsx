import Link from "next/link";
import { RegistrationForm } from "./RegistrationForm";
import styles from "./styles.module.css";
import { Suspense } from "react";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function RegistrationPage({ searchParams }: Props) {
  return (
    <div className={styles.registrationPage}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            CleWe
          </Link>
        </nav>
      </header>
      <main className={styles.main}>
        <Suspense fallback={<p>Loading...</p>}>
          <RegistrationForm />
        </Suspense>
      </main>
      <footer className={styles.actionsFooter}>
        Have an account?{" "}
        <Link href="/login" className="link">
          Log&nbsp;in
        </Link>
      </footer>
    </div>
  );
}
