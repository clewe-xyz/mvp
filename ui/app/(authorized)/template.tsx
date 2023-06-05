import Link from "next/link";
import NavigationMenu from "./NavigationMenu";
import styles from "./layout.module.css";

export default function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            CleWe
          </Link>
          <NavigationMenu />
        </nav>
      </header>
      {children}
    </>
  );
}
