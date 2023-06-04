import { Input } from "@/ui-kit/inputs/Input";
import styles from "./styles.module.css";
import Link from "next/link";

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
        <form className={styles.registrationForm}>
          <div className={styles.inputBlock}>
            <Input type="text" label="Nickname" id="Nickname" />
          </div>
          <div className={styles.inputBlock}>
            <Input type="email" label="Email" id="Email" />
          </div>
          <div className={styles.inputBlock}>
            <Input type="password" label="Password" id="Password" />
          </div>
          <div className={styles.inputBlock}>
            <Input
              type="password"
              label="Confirm password"
              id="confirm-password"
            />
          </div>
          <div className={styles.actions}>
            <button type="submit" className="button button-accent">
              Create account
            </button>
          </div>
        </form>
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
