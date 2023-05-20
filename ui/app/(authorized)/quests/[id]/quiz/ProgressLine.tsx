import styles from "./page.module.css";

type Props = {
  progress: number;
};

export default function ProgressLine({ progress }: Props) {
  return (
    <span
      className={styles.progressFill}
      style={{
        transform: `scale(${progress / 100}, 1)`,
      }}
    />
  );
}
