import { PageLoader } from "@/ui-kit/loaders";
import styles from "./layout.module.css";

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <PageLoader />
    </div>
  );
}
