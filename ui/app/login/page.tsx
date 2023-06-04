import { Input } from "@/ui-kit/inputs/Input";
import styles from "./styles.module.css";
import Link from "next/link";

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
        <form className={styles.loginForm}>
          <div className={styles.inputBlock}>
            <Input type="text" label="Nickname" id="Nickname" />
          </div>
          <div className={styles.inputBlock}>
            <Input type="password" label="Password" id="Password" />
          </div>
          <div className={styles.actions}>
            <button type="submit" className="button button-accent">
              Log in
            </button>
          </div>
        </form>
      </main>
      <footer className={styles.actionsFooter}>
        Do not have an account?{" "}
        <Link href="/registration" className={styles.redirectionLink}>
          Create&nbsp;a&nbsp;new&nbsp;one
        </Link>
      </footer>
    </div>
  );
}
