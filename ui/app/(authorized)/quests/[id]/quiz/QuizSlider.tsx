import { SkillReward } from "@/app/(authorized)/skill";
import { ProgressLine } from "@/ui-kit/progress-line";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import { useRef, useState } from "react";
import styles from "./page.module.css";
import {
  MultipleAnswersQuestion,
  OpenQuestion,
  SingleAnswerQuestion,
} from "./questions";
import { QuestionAnswers, QuestionType, QuizQuestion } from "./types";

type Props = {
  questions: QuizQuestion[];
  onCorrectAnswer: ({
    expirienceReward,
    skillsReward,
  }: {
    expirienceReward: number;
    skillsReward: SkillReward[];
  }) => void;
  onIncorrectAnswer: () => void;
  onFinish: () => void;
};

export default function QuizSlider({
  questions,
  onCorrectAnswer,
  onIncorrectAnswer,
  onFinish,
}: Props) {
  const [quizProgress, setQuizProgress] = useState(0); // from 0 to 100
  const progressStep =
    questions.length > 1
      ? Number((100 / (questions.length - 1)).toFixed(1))
      : 100;
  const splide = useRef<Splide>(null);

  const goToNextQuestionOrFinish = () => {
    if (quizProgress === 100) {
      return onFinish();
    }
    splide.current?.go(">");
    // Normalize decimal value, to simplify calculation of a last question
    const updatedQuizProgress = Math.min(
      Math.ceil(quizProgress + progressStep),
      100
    );
    setQuizProgress(updatedQuizProgress);
  };

  const fixateCorrectAnswer = ({
    expirienceReward,
    skillsReward,
  }: {
    expirienceReward: number;
    skillsReward: SkillReward[];
  }) => {
    onCorrectAnswer({ expirienceReward, skillsReward });
    goToNextQuestionOrFinish();
  };

  const fixateIncorrectAnswer = () => {
    onIncorrectAnswer();
    goToNextQuestionOrFinish();
  };

  return (
    <>
      <div className={styles.quizProgress}>
        <ProgressLine currentProgress={quizProgress} />
      </div>
      <Splide
        className={styles.quiz}
        options={{
          perPage: 1,
          perMove: 1,
          arrows: false,
          pagination: false,
          drag: false,
          width: "100%",
        }}
        tag="div"
        ref={splide}
      >
        {questions.map((question) => (
          <SplideSlide key={question.id} className={styles.quizSlide}>
            <ResolvedQuestion
              id={question.id}
              question={question.question}
              type={question.type}
              answers={question.answers}
              onCorrect={() =>
                fixateCorrectAnswer({
                  expirienceReward: question.experience_reward,
                  skillsReward: question.skills,
                })
              }
              onIncorrect={fixateIncorrectAnswer}
            />
          </SplideSlide>
        ))}
      </Splide>
    </>
  );
}

type ResolvedQuestionProps = {
  id: number;
  type: QuestionType;
  question: string;
  answers: QuestionAnswers;
  onCorrect: () => void;
  onIncorrect: () => void;
};

function ResolvedQuestion({
  id,
  type,
  question,
  answers,
  onCorrect,
  onIncorrect,
}: ResolvedQuestionProps) {
  if (type === "Opened-text") {
    return (
      <OpenQuestion
        id={id}
        question={question}
        onCorrect={onCorrect}
        onIncorrect={onIncorrect}
      />
    );
  }

  if (type === "Multiple-options") {
    return (
      <MultipleAnswersQuestion
        id={id}
        question={question}
        answers={answers as string[]}
        onCorrect={onCorrect}
        onIncorrect={onIncorrect}
      />
    );
  }

  if (type === "Single-option") {
    return (
      <SingleAnswerQuestion
        id={id}
        question={question}
        answers={answers as string[]}
        onCorrect={onCorrect}
        onIncorrect={onIncorrect}
      />
    );
  }

  return null;
}
