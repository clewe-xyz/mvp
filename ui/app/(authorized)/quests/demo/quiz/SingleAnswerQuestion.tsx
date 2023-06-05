import { RadioGroup } from "@/ui-kit/inputs/RadioGroup";
import { useForm } from "react-hook-form";
import styles from "./page.module.css";

type Props = {
  question: string;
  answers: SingleAnswer;
  onCorrect: () => void;
  onIncorrect: () => void;
};

export type SingleAnswer = {
  true_answers: string;
  fake_answers: string[];
};

type FormData = {
  answer: string;
};

export default function SingleAnswerQuestion({
  question,
  answers,
  onCorrect,
  onIncorrect,
}: Props) {
  const { register, handleSubmit } = useForm<FormData>();
  const validateAnswer = ({ answer }: FormData) => {
    if (answer === answers.true_answers) {
      return onCorrect();
    }
    return onIncorrect();
  };
  const options = [answers.true_answers, ...answers.fake_answers];
  return (
    <>
      <div className={styles.quizQuestion}>{question}</div>
      <form
        className={styles.quizAnswer}
        onSubmit={handleSubmit(validateAnswer)}
      >
        <div className={styles.quizAnswerField}>
          <RadioGroup {...register("answer")} labels={options} />
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
