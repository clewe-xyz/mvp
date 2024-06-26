"use client";

import classNames from "classnames";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";

type Props = {
  isOpened: boolean;
  children: ReactNode;
  hideClose?: boolean;
  onClose?: () => void;
};

export function Modal({ isOpened, children, hideClose, onClose }: Props) {
  const [isInitialized, initialize] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      initialize(true);
    }
  }, []);

  return (
    <>
      {isInitialized
        ? createPortal(
            <div
              className={classNames(styles.modal, {
                [styles.opened]: isOpened,
              })}
            >
              <div className={styles.modalContent}>
                {hideClose ? null : (
                  <header className={styles.modalHeader}>
                    <button
                      type="button"
                      className={classNames("button", styles.navButton)}
                      onClick={onClose}
                    >
                      Close
                    </button>
                  </header>
                )}
                {children}
              </div>
            </div>,
            window.document.body
          )
        : null}
    </>
  );
}
