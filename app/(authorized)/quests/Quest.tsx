import classNames from "classnames";
import Link from "next/link";
import { SkillImage, SkillType } from "../skill";
import QuestImage from "./QuestImage";
import styles from "./page.module.css";

type Props = {
  id: number;
  name: string;
  description: string;
  tag: string;
  skills: SkillType[];
  isCompleted: boolean;
};

export default function Quest({
  id,
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
        {isCompleted ? (
          <span className={styles.completionLabel}>Completed</span>
        ) : null}
      </div>
      <div className={styles.questAbout}>
        <h3>{name}</h3>
        <p>{description}</p>
        <div className={styles.skills}>
          {skills.map((skill) => (
            <div key={skill.id} className={styles.singleSkill}>
              <SkillImage
                className={styles.skillIcon}
                tag={skill.tag}
                width={32}
              />
              {skill.topic}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.questActions}>
        {isCompleted ? (
          <Link
            href={`/quests/${id}/preparation`}
            className={classNames(
              "button",
              "button-outline",
              styles.questActionButton
            )}
          >
            Restart quest
          </Link>
        ) : (
          <Link
            href={`/quests/${id}/preparation`}
            className={classNames(
              "button",
              "button-accent",
              styles.questActionButton
            )}
          >
            Start quest
          </Link>
        )}
      </div>
    </div>
  );
}
