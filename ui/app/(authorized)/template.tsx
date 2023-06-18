import Link from "next/link";
import { Suspense } from "react";
import AuthContext from "./AuthContext";
import NavigationMenu from "./NavigationMenu";
import styles from "./layout.module.css";

export default function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContext>
      <div className={styles.authorizedLayout}>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <Link href="/profile" className={styles.logo}>
              CleWe
            </Link>
            <Suspense fallback={null}>
              <NavigationMenu />
            </Suspense>
          </nav>
        </header>
        {/* Container needed to setup a base layout */}
        <div>{children}</div>
      </div>
    </AuthContext>
  );
}
