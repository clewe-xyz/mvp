"use client";

import classNames from "classnames";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./navigation.module.css";

export default function NavigationMenu() {
  const [isInitialized, initialize] = useState(false);
  const [isOpened, setOpened] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const url = `${pathname}?${searchParams}`;

  useEffect(() => {
    if (typeof window !== "undefined") {
      initialize(true);
    }
  }, []);

  useEffect(() => {
    setOpened(false);
  }, [url]);

  return (
    <>
      <button
        type="button"
        className={classNames("button", styles.navButton)}
        onClick={() => {
          setOpened(true);
        }}
      >
        Menu
      </button>
      {isInitialized
        ? createPortal(
            <div
              className={classNames(styles.navMenu, {
                [styles.opened]: isOpened,
              })}
            >
              <div className={styles.navBlock}>
                <div className={styles.navBlockContent}>
                  <header className={styles.navBlockHeader}>
                    <button
                      type="button"
                      className={classNames("button", styles.navButton)}
                      onClick={() => {
                        setOpened(false);
                      }}
                    >
                      Close
                    </button>
                  </header>
                  <ul className={styles.navMenuItems}>
                    <li>
                      <Link href="/profile" onClick={() => setOpened(false)}>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link href="/quests" onClick={() => setOpened(false)}>
                        Quests
                      </Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        className={styles.logOut}
                        onClick={() => {
                          fetch("/api/users/logout", {
                            method: "POST",
                          }).then(() => router.push("/"));
                        }}
                      >
                        Log out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>,
            window.document.body
          )
        : null}
    </>
  );
}
