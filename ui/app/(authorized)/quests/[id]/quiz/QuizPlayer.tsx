import classNames from "classnames";
import ProgressLine from "./ProgressLine";
import styles from "./page.module.css";

type Props = {
  nickname: string;
  level: number;
  totalExperience: number;
  experienceReward?: number;
};

export default function QuizPlayer({
  nickname,
  level,
  totalExperience,
  experienceReward,
}: Props) {
  return (
    <>
      <h4 className={styles.nickName}>{nickname}</h4>
      <div>
        <div className={styles.levelContainer}>
          <h5 className={styles.level}>Level: {level}</h5>
          {experienceReward !== undefined ? (
            <span
              className={classNames(styles.addedExperience, {
                [styles.correctAnswer]: experienceReward > 0,
                [styles.incorrectAnswer]: experienceReward === 0,
              })}
            >
              {experienceReward > 0 ? `+${experienceReward} XP` : `0 XP`}
            </span>
          ) : null}
        </div>
        <div className={styles.levelProgress}>
          <ProgressLine progress={totalExperience} />
        </div>
      </div>
    </>
  );
}
