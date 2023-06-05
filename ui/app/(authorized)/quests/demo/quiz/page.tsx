"use client";

import { Skill, SkillReward } from "@/app/(authorized)/skill";
import { Modal } from "@/ui-kit/modal";
import "@splidejs/react-splide/css/core";
import classNames from "classnames";
import Link from "next/link";
import { useRef, useState } from "react";
import QuizPlayer from "./QuizPlayer";
import QuizSlider from "./QuizSlider";
import styles from "./page.module.css";
import { Quiz } from "./types";
import { Input } from "@/ui-kit/inputs/Input";
import { useForm } from "react-hook-form";

const MOCKED_QUIZ: Quiz = {
  id: "ae4jjo8",
  title: "Finance fundamentals",
  questions: [
    {
      id: "ior934",
      type: "opened-text",
      question:
        "What are main decisions in the architecture of the first blockchain?",
      answers: {
        true_answers: "Publicity and trust",
        fake_answers: null,
      },
      experience_rewad: 18,
      skills_reward: [
        {
          id: "ewjnio2908",
          topic: "Blockchain",
          tag: "blockchain",
          points: 3,
        },
      ],
    },
    {
      id: "joo32900",
      type: "single-option",
      question: "Choose one of the many options?",
      answers: {
        true_answers: "First",
        fake_answers: ["Second", "Third", "Fourth"],
      },
      experience_rewad: 10,
      skills_reward: [
        {
          id: "fdmkl32oi",
          topic: "Finance fundamentals",
          tag: "finance",
          points: 2,
        },
        {
          id: "ewjnio2908",
          topic: "Blockchain",
          tag: "blockchain",
          points: 2,
        },
      ],
    },
    {
      id: "asdsaj984",
      type: "multiple-options",
      question: "Choose one of the many options?",
      answers: {
        true_answers: ["Third", "Fourth"],
        fake_answers: ["First", "Second"],
      },
      experience_rewad: 30,
      skills_reward: [
        {
          id: "fdmkl32oi",
          topic: "Finance fundamentals",
          tag: "finance",
          points: 5,
        },
      ],
    },
    {
      id: "fdl9043",
      type: "multiple-options",
      question: "Choose one of the many options?",
      answers: {
        true_answers: ["GlenA"],
        fake_answers: ["ewq", "Secogfdfdnd", "JdVir"],
      },
      experience_rewad: 30,
      skills_reward: [
        {
          id: "fdmkl32oi",
          topic: "Finance fundamentals",
          tag: "finance",
          points: 5,
        },
      ],
    },
  ],
};

type NickNameData = {
  nickname: string;
};

export default function SingleQuiz() {
  const [nickname, setNickname] = useState("");
  const [accumExp, setAccumExp] = useState(0);
  const [expReward, setExpReward] = useState<number | undefined>(undefined);
  const [accumSkills, setAccumSkills] = useState<SkillReward[]>([]);
  const [userLevel, setUserLevel] = useState(1);
  const [correctAnswersAmount, setCorrectAnswersAmount] = useState(0);
  const [incorrectAnswersAmount, setIncorrectAnswersAmount] = useState(0);
  const [isCompletionModalOpened, openCompletionModal] = useState(false);
  const [isNicknameModalOpened, openNicknameModal] = useState(true);

  const { register, handleSubmit } = useForm<NickNameData>();

  const setupNickname = ({ nickname }: NickNameData) => {
    setNickname(nickname);
    openNicknameModal(false);
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

  return (
    <>
      <main className={styles.singleQuiz}>
        <h3 className={styles.title}>{MOCKED_QUIZ.title}</h3>
        <section className={styles.quizContainer}>
          <QuizSlider
            questions={MOCKED_QUIZ.questions}
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
      </main>
      <Modal isOpened={isNicknameModalOpened} hideClose>
        <div className={styles.quizStatsContent}>
          <form onSubmit={handleSubmit(setupNickname)}>
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
                    points={`+${skill.points}`}
                  />
                ))}
              </div>
            </div>
          ) : null}

          <div className={styles.statsActions}>
            <p>Want to save the progress and try more quests?</p>
            <Link
              href={`/registration?nickname=${nickname}`}
              className={classNames("button", "button-accent")}
            >
              Create an account
            </Link>
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
   * 1. Shallow merge -> new list
   * 2. Iterate through shallow merge, find all duplicates in the rest of the list
   * 3. Summarise points, put final result to output list
   * 4. If duplicates not found - put to output list without summarization
   * 5. If skill with this `id` is already in the final list - skip
   */
  const outputSkillsStats: SkillReward[] = [];
  const shallowMerge = [...accumulated, ...reward];
  shallowMerge.forEach((skill, idx, list) => {
    // Skip when skill were already calculated
    if (
      outputSkillsStats.find((outputSkill) => outputSkill.id === skill.id) !==
      undefined
    ) {
      return;
    }
    const duplicates = list.filter((element) => element.id === skill.id);
    const accumulatedPoints = duplicates.reduce((prev, current) => {
      return (prev += current.points);
    }, 0);
    outputSkillsStats.push({ ...skill, points: accumulatedPoints });
  });
  return outputSkillsStats;
}
