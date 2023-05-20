import classNames from "classnames";
import { ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";

type Props = {
  isOpened: boolean;
  children: ReactNode;
  hideClose?: boolean;
  onClose?: () => void;
};

export function Modal({ isOpened, children, hideClose, onClose }: Props) {
  return (
    <>
      {createPortal(
        <div
          className={classNames(styles.modal, {
            [styles.opened]: isOpened,
          })}
        >
          <div className={styles.modalContent}>
            <header className={styles.modalHeader}>
              {hideClose ? null : (
                <button
                  type="button"
                  className={classNames("button", styles.navButton)}
                  onClick={onClose}
                >
                  Close
                </button>
              )}
            </header>
            {children}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
