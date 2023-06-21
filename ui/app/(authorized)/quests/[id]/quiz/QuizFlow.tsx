"use client";

import { Skill, SkillReward } from "@/app/(authorized)/skill";
import { unauthorizedRequest } from "@/app/api/unauthorizedRequest";
import { Input } from "@/ui-kit/inputs/Input";
import { Modal } from "@/ui-kit/modal";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import QuizPlayer from "./QuizPlayer";
import QuizSlider from "./QuizSlider";
import styles from "./page.module.css";
import { QuizQuestion } from "./types";

type Props = {
  id: number;
  questions: QuizQuestion[];
  user: {
    nickname: string;
    level: number;
    accumulatedExp: number;
    expToNextLevel: number;
  } | null;
  allLevels: {
    level: number;
    exp: number;
  }[];
};

type NickNameData = {
  nickname: string;
};

export default function QuizFlow({ id: questId, questions, user }: Props) {
  const [demoUserId, setDemoUserId] = useState<number>();
  const [nickname, setNickname] = useState(user?.nickname ?? "");
  const [userLevel, setUserLevel] = useState(user?.level ?? 1);
  const [accumExp, setAccumExp] = useState(user?.accumulatedExp ?? 0);
  const [expReward, setExpReward] = useState<number | undefined>(undefined);
  const [accumSkills, setAccumSkills] = useState<SkillReward[]>([]);
  const [correctAnswersAmount, setCorrectAnswersAmount] = useState(0);
  const [incorrectAnswersAmount, setIncorrectAnswersAmount] = useState(0);
  const [isCompletionModalOpened, openCompletionModal] = useState(false);
  const [isNicknameModalOpened, openNicknameModal] = useState(!Boolean(user));

  const { push } = useRouter();

  const { register, handleSubmit } = useForm<NickNameData>();

  const setupDemoUser = ({ nickname }: NickNameData) => {
    unauthorizedRequest("/api/users/signup/demo", {
      method: "POST",
      body: JSON.stringify({ nickname }),
    })
      .then((response) => response.json())
      .then(({ id }) => {
        setNickname(nickname);
        setDemoUserId(id);
        setUserLevel(1);
        openNicknameModal(false);
      });
  };

  const expRewardTimeoutRef = useRef<NodeJS.Timeout>();
  const updateExpReward = (reward: number) => {
    clearTimeout(expRewardTimeoutRef.current);
    setExpReward(reward);
    expRewardTimeoutRef.current = setTimeout(
      () => setExpReward(undefined),
      2000
    );
  };

  const completeQuest = () =>
    unauthorizedRequest(`/api/quests/${questId}/complete`, {
      method: "POST",
      body: JSON.stringify({
        experience: accumExp,
        skills: accumSkills.map((skill) => ({ id: skill.id })),
      }),
    });

  return (
    <>
      <section className={styles.quizContainer}>
        <QuizSlider
          questions={questions}
          onCorrectAnswer={({ expirienceReward, skillsReward }) => {
            setAccumExp(accumExp + expirienceReward);
            setAccumSkills(
              updateSkillsReward({
                accumulated: accumSkills,
                reward: skillsReward,
              })
            );
            setCorrectAnswersAmount(correctAnswersAmount + 1);
            updateExpReward(expirienceReward);
          }}
          onIncorrectAnswer={() => {
            setIncorrectAnswersAmount(incorrectAnswersAmount + 1);
            updateExpReward(0);
          }}
          onFinish={() => {
            openCompletionModal(true);
          }}
        />
      </section>
      <section className={styles.user}>
        <QuizPlayer
          nickname={nickname}
          level={userLevel}
          totalExperience={accumExp}
          experienceReward={expReward}
        />
      </section>
      <Modal isOpened={isNicknameModalOpened} hideClose>
        <div className={styles.quizStatsContent}>
          <form onSubmit={handleSubmit(setupDemoUser)}>
            <h3>
              <label htmlFor="demo-quest-nickname">Nickname</label>
            </h3>
            <Input
              type="text"
              id="demo-quest-nickname"
              required
              {...register("nickname", { required: true })}
            />
            <div className={styles.statsActions}>
              <button className={classNames("button", "button-accent")}>
                Start quiz
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal isOpened={isCompletionModalOpened} hideClose>
        <div className={styles.quizStatsContent}>
          <h2>Quest completed!</h2>
          <div className={styles.experienceSummary}>
            <div className={styles.statBlock}>
              <div className={styles.statText}>
                <div className={styles.statResult}>+{accumExp}</div>
                <div className={styles.statTitle}>Experience gained</div>
              </div>
            </div>
          </div>
          <div className={styles.answersStatsSummary}>
            <div className={classNames(styles.statBlock, styles.inheritWidth)}>
              <div className={classNames(styles.statText, styles.correct)}>
                <div className={styles.statResult}>{correctAnswersAmount}</div>
                <div className={styles.statTitle}>Correct</div>
              </div>
            </div>
            <div className={classNames(styles.statBlock, styles.inheritWidth)}>
              <div className={classNames(styles.statText, styles.incorrect)}>
                <div className={styles.statResult}>
                  {incorrectAnswersAmount}
                </div>
                <div className={styles.statTitle}>Incorrect</div>
              </div>
            </div>
          </div>
          {accumSkills.length > 0 ? (
            <div className={styles.skillsSummary}>
              <h4 className={styles.skillsSummaryTitle}>Improved skills</h4>
              <div className={styles.skillsSummaryContainer}>
                {accumSkills.map((skill) => (
                  <Skill
                    key={skill.id}
                    name={skill.topic}
                    tag={skill.tag}
                    points={`+${skill.point}`}
                  />
                ))}
              </div>
            </div>
          ) : null}

          <div className={styles.statsActions}>
            {user ? (
              <button
                type="button"
                onClick={() => completeQuest().then(() => push("/quests"))}
                className={classNames("button", "button-accent")}
              >
                Go to quests
              </button>
            ) : (
              <>
                <p>Want to save the progress and try more quests?</p>
                <button
                  type="button"
                  onClick={() => {
                    sessionStorage.setItem(
                      "demo_user",
                      JSON.stringify({
                        id: demoUserId,
                        questId,
                        nickname,
                        accumExp,
                        accumSkills,
                      })
                    );
                    push("/registration");
                  }}
                  className={classNames("button", "button-accent")}
                >
                  Create an account
                </button>
                <p className={styles.divider}>or just</p>
                <Link
                  href="/"
                  className={classNames("button", "button-outline")}
                >
                  Leave
                </Link>
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}

function updateSkillsReward({
  accumulated,
  reward,
}: {
  accumulated: SkillReward[];
  reward: SkillReward[];
}) {
  /**
   * 1. Shallow copy -> new list
   * 2. Iterate through the shallow copy, find all duplicates in the rest of the list
   * 3. Summarise points, put final result to output list
   * 4. If duplicates not found - put to output list without summarization
   * 5. If skill with this `tag` is already in the final list - skip,
   * bacause it means calculation was already done on the previous iteration
   */
  const outputSkillsStats: SkillReward[] = [];
  const shallowMerge = [...accumulated, ...reward];
  shallowMerge.forEach((skill, idx, list) => {
    // Skip when skill were already calculated
    if (
      outputSkillsStats.find((outputSkill) => outputSkill.tag === skill.tag) !==
      undefined
    ) {
      return;
    }
    const duplicates = list.filter((element) => element.tag === skill.tag);
    const accumulatedPoints = duplicates.reduce((prev, current) => {
      return (prev += current.point);
    }, 0);
    outputSkillsStats.push({ ...skill, point: accumulatedPoints });
  });
  return outputSkillsStats;
}
