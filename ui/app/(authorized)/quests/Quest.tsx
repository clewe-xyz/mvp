import classNames from "classnames";
import Link from "next/link";
import { SkillImage, SkillType } from "../skill";
import QuestImage from "./QuestImage";
import styles from "./page.module.css";

type Props = {
  name: string;
  description: string;
  tag: string;
  skills: SkillType[];
  isCompleted: boolean;
};

export default function Quest({
  name,
  description,
  tag,
  skills,
  isCompleted,
}: Props) {
  return (
    <div className={styles.quest}>
      <div className={styles.bgImageWrapper}>
        <QuestImage tag={tag} />
      </div>
      <div className={styles.questAbout}>
        <h3>{name}</h3>
        <p>{description}</p>
        <div className={styles.skills}>
          <div className={styles.singleSkill}>
            <SkillImage className={styles.skillIcon} tag="finance" width={32} />
            Finance
          </div>
          <div className={styles.singleSkill}>
            <SkillImage className={styles.skillIcon} tag="tokens" width={32} />
            Crypto basics
          </div>
        </div>
      </div>
      <div className={styles.questActions}>
        <Link
          href="#"
          className={classNames(
            "button",
            "button-accent",
            styles.questActionButton
          )}
        >
          Start quest
        </Link>
      </div>
    </div>
  );
}
