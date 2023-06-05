import { Checkbox } from "@/ui-kit/inputs/Checkbox";
import { useForm } from "react-hook-form";
import styles from "./page.module.css";

type Props = {
  question: string;
  answers: MultipleAnswer;
  onCorrect: () => void;
  onIncorrect: () => void;
};

export type MultipleAnswer = {
  true_answers: string[];
  fake_answers: string[];
};

type FormData = {
  answers: string[];
};

export default function MultipleAnswersQuestion({
  question,
  answers,
  onCorrect,
  onIncorrect,
}: Props) {
  const { register, handleSubmit } = useForm<FormData>();
  const options = [...answers.true_answers, ...answers.fake_answers];

  const validateAnswer = ({ answers: givenAnswers }: FormData) => {
    if (areArraysEqual(givenAnswers, answers.true_answers)) {
      return onCorrect();
    }
    return onIncorrect();
  };

  return (
    <>
      <div className={styles.quizQuestion}>{question}</div>
      <form
        className={styles.quizAnswer}
        onSubmit={handleSubmit(validateAnswer)}
      >
        <div className={styles.quizAnswerField}>
          {options.map((option) => (
            <Checkbox
              {...register("answers")}
              key={option}
              label={option}
              value={option}
            />
          ))}
        </div>
        <div className={styles.quizAnswerActions}>
          <button className={styles.answerButton} type="submit">
            Answer
          </button>
        </div>
      </form>
    </>
  );
}

function areArraysEqual(list1: string[], list2: string[]) {
  if (list1.length !== list2.length) {
    return false;
  }
  return list1.every((element) => list2.includes(element));
}
