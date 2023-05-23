import SkillImage from "./SkillImage";
import styles from "./styles.module.css";

export type SkillReward = {
  id: string;
  topic: string;
  tag: string;
  points: number;
};

type Props = {
  name: string;
  tag: string;
  points?: string;
};

export function Skill({ name, tag, points }: Props) {
  return (
    <div className={styles.skill}>
      <div className={styles.skillImageContainer}>
        <SkillImage className={styles.skillImage} tag={tag} />
      </div>
      <div className={styles.skillText}>
        {points ? (
          <div className={styles.skillPoints}>
            {points}
            <span className={styles.measure}>pts</span>
          </div>
        ) : null}
        <div className={styles.statTitle}>{name}</div>
      </div>
    </div>
  );
}
