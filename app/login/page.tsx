import Link from "next/link";
import { LoginForm } from "./LoginForm";
import styles from "./styles.module.css";

export default function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            CleWe
          </Link>
        </nav>
      </header>
      <main className={styles.main}>
        <LoginForm />
      </main>
      <footer className={styles.actionsFooter}>
        Do not have an account?{" "}
        <Link href="/registration" className="link">
          Create&nbsp;a&nbsp;new&nbsp;one
        </Link>
      </footer>
    </div>
  );
}
