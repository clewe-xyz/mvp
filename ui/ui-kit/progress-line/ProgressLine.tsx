import styles from "./styles.module.css";

type Props = {
  currentProgress: number;
  totalProgress?: number;
};

export function ProgressLine({ currentProgress, totalProgress = 100 }: Props) {
  return (
    <span
      className={styles.progressFill}
      style={{
        transform: `scale(${currentProgress / totalProgress}, 1)`,
      }}
    />
  );
}
