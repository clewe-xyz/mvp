import quest1 from "@/images/quests/01.jpg";
import quest2 from "@/images/quests/02.jpg";
import quest3 from "@/images/quests/03.jpg";
import Image from "next/image";
import styles from "./page.module.css";

type Props = {
  tag: string;
};

export default function QuestImage({ tag }: Props) {
  switch (tag) {
    case "financial-basics":
      return (
        <Image
          className={styles.questImage}
          src={quest1}
          alt="Finance fundamentals"
        />
      );
    case "web-3":
      return <Image className={styles.questImage} src={quest2} alt="Web 3" />;

    default:
      return (
        <Image
          className={styles.questImage}
          src={quest3}
          alt="Alternative Image"
        />
      );
  }
}
