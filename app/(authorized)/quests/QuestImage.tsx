import quest1 from "@/images/quests/01.jpg";
import quest2 from "@/images/quests/02.jpg";
import quest3 from "@/images/quests/03.jpg";
import quest4 from "@/images/quests/04.jpg";
import Image from "next/image";
import styles from "./page.module.css";

type Props = {
  tag: string;
};

export default function QuestImage({ tag }: Props) {
  switch (tag) {
    case "blockchain":
      return (
        <Image className={styles.questImage} src={quest1} alt="Blockchain" />
      );
    case "dex":
      return <Image className={styles.questImage} src={quest2} alt="DEX" />;
    case "wallets":
      return (
        <Image
          className={styles.questImage}
          src={quest3}
          alt="Crypto wallets"
        />
      );
    default:
      return (
        <Image className={styles.questImage} src={quest4} alt="Alternative" />
      );
  }
}
