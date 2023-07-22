import styles from "./layout.module.css";

export default function QuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.layout}>{children}</div>;
}
