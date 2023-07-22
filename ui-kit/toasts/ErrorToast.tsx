import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./toasts.module.css";
import Image from "next/image";
import errorIcon from "./error.png";

type Props = {
  children: ReactNode;
  onClose: () => void;
};

export function ErrorToast({ children, onClose }: Props) {
  return (
    <span className={classNames(styles.toast, styles.error)}>
      <button className={styles.closeBtn} onClick={onClose}>
        <Image alt="error" src={errorIcon} width={32} height={32} />
      </button>
      <span className={styles.text}>{children}</span>
    </span>
  );
}
