import { ProgressLine } from "@/ui-kit/progress-line";
import classNames from "classnames";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";

type Props = {
  nickname: string;
  level: number;
  accumExp: number;
  levelMaxExp: number;
  experienceReward?: number;
};

export default function QuizPlayer({
  nickname,
  level,
  accumExp,
  levelMaxExp,
  experienceReward,
}: Props) {
  const experienceNode = useRef<HTMLSpanElement>(null);
  const levelUpTimeoutRef = useRef<NodeJS.Timeout>();
  const [levelUp, triggerLevelUp] = useState(false);

  if (experienceNode.current) {
    experienceNode.current.style.animation = "none";
    // !!! Trigger reflow to ensure that animation restarts
    void experienceNode.current.offsetWidth;
    experienceNode.current.style.animation = "";
  }

  useEffect(() => {
    clearTimeout(levelUpTimeoutRef.current);
    triggerLevelUp(true);
    levelUpTimeoutRef.current = setTimeout(() => triggerLevelUp(false), 3000);
  }, [level]);

  return (
    <>
      <h4 className={styles.nickName}>{nickname}</h4>
      <div>
        <div className={styles.levelContainer}>
          <h5 className={styles.level}>
            Level:{" "}
            <span
              className={classNames(styles.currentLevel, {
                [styles.levelUpAnimation]: levelUp,
              })}
            >
              {level}
            </span>
          </h5>
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
          <ProgressLine
            currentProgress={accumExp}
            totalProgress={levelMaxExp}
          />
        </div>
      </div>
    </>
  );
}
