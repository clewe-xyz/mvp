import classNames from "classnames";
import styles from "./layout.module.css";
import NavigationMenu from "./NavigationMenu";

export default function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <span className={styles.logo}>CleWe</span>
          <NavigationMenu />
        </nav>
      </header>
      {children}
    </>
  );
}
