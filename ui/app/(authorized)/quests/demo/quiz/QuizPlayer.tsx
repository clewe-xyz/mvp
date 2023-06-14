import { ProgressLine } from "@/ui-kit/progress-line";
import classNames from "classnames";
import styles from "./page.module.css";
import { useRef } from "react";

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
  const experienceNode = useRef<HTMLSpanElement>(null);
  if (experienceNode.current) {
    experienceNode.current.style.animation = "none";
    // !!! Trigger reflow to ensure that animation restarts
    void experienceNode.current.offsetWidth;
    experienceNode.current.style.animation = "";
  }
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
              ref={experienceNode}
            >
              {experienceReward > 0 ? `+${experienceReward} XP` : `0 XP`}
            </span>
          ) : null}
        </div>
        <div className={styles.levelProgress}>
          <ProgressLine currentProgress={totalExperience} />
        </div>
      </div>
    </>
  );
}
