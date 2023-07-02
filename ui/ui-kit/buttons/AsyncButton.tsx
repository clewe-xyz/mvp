import classNames from "classnames";
import { ReactNode, useState } from "react";
import styles from "./styles.module.css";

type Props = {
  asyncAction: () => Promise<unknown>;
  children: ReactNode;
  className?: string;
};

export function AsyncButton({ asyncAction, className, children }: Props) {
  const [loading, setLoading] = useState(false);
  return (
    <button
      type="button"
      className={classNames("button", className)}
      onClick={() => {
        setLoading(true);
        asyncAction().finally(() => setLoading(false));
      }}
      disabled={loading}
    >
      {loading ? <Loading /> : children}
    </button>
  );
}

function Loading() {
  return <span className={styles.spinner} />;
}
