import { Textarea } from "@/ui-kit/inputs/Textarea";
import { useForm } from "react-hook-form";
import styles from "./page.module.css";

type Props = {
  question: string;
  answers: OpenQuestionAnswer;
  onCorrect: () => void;
  onIncorrect: () => void;
};

export type OpenQuestionAnswer = {
  true_answers: string;
  fake_answers: null;
};

type FormData = {
  answer: string;
};

export default function OpenQuestion({
  question,
  answers,
  onCorrect,
  onIncorrect,
}: Props) {
  const { register, handleSubmit } = useForm<FormData>();
  const validateAnswer = ({ answer }: FormData) => {
    const normalizedAnswer = normalizeAnswer(answer);
    const normalizedCorrectAnswer = normalizeAnswer(answers.true_answers);
    if (normalizedAnswer === normalizedCorrectAnswer) {
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
          <Textarea {...register("answer")} />
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

function normalizeAnswer(answer: string) {
  const clonedSpace = /\s/gi;
  return answer.trim().replaceAll(clonedSpace, " ").toLocaleLowerCase();
}
