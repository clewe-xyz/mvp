"use client";

import classNames from "classnames";
import styles from "./navigation.module.css";
import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function NavigationMenu() {
  const [isOpened, setOpened] = useState(false);

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
      {typeof window !== "undefined"
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
                      <Link href="/profile">Profile</Link>
                    </li>
                    <li>
                      <Link href="/quests">Quests</Link>
                    </li>
                    <li>
                      <Link href="/">Log out</Link>
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
