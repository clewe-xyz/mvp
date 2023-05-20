import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useRef, useState } from "react";
import MultipleAnswersQuestion, {
  MultipleAnswer,
} from "./MultipleAnswersQuestion";
import OpenQuestion, { OpenQuestionAnswer } from "./OpenQuestion";
import ProgressLine from "./ProgressLine";
import SingleAnswerQuestion, { SingleAnswer } from "./SingleAnswerQuestion";
import styles from "./page.module.css";
import {
  QuestionAnswers,
  QuestionType,
  QuizQuestion,
  SkillReward,
} from "./types";

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
        <ProgressLine progress={quizProgress} />
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
              question={question.question}
              type={question.type}
              answers={question.answers}
              onCorrect={() =>
                fixateCorrectAnswer({
                  expirienceReward: question.experience_rewad,
                  skillsReward: question.skills_reward,
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
  type: QuestionType;
  question: string;
  answers: QuestionAnswers;
  onCorrect: () => void;
  onIncorrect: () => void;
};

function ResolvedQuestion({
  type,
  question,
  answers,
  onCorrect,
  onIncorrect,
}: ResolvedQuestionProps) {
  if (type === "opened-text") {
    return (
      <OpenQuestion
        question={question}
        answers={answers as OpenQuestionAnswer}
        onCorrect={onCorrect}
        onIncorrect={onIncorrect}
      />
    );
  }

  if (type === "multiple-options") {
    return (
      <MultipleAnswersQuestion
        question={question}
        answers={answers as MultipleAnswer}
        onCorrect={onCorrect}
        onIncorrect={onIncorrect}
      />
    );
  }

  if (type === "single-option") {
    return (
      <SingleAnswerQuestion
        question={question}
        answers={answers as SingleAnswer}
        onCorrect={onCorrect}
        onIncorrect={onIncorrect}
      />
    );
  }

  return null;
}
