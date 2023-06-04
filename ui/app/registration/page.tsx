import Link from "next/link";
import { RegistrationForm } from "./RegistrationForm";
import styles from "./styles.module.css";

export default function RegistrationPage() {
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
        <RegistrationForm />
      </main>
      <footer className={styles.actionsFooter}>
        Have an account?{" "}
        <Link href="/login" className={styles.redirectionLink}>
          Log&nbsp;in
        </Link>
      </footer>
    </div>
  );
}
