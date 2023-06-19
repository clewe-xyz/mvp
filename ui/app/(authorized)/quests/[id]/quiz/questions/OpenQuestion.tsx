import { Textarea } from "@/ui-kit/inputs/Textarea";
import { useForm } from "react-hook-form";
import styles from "../page.module.css";
import { unauthorizedRequest } from "@/app/api/unauthorizedRequest";

type Props = {
  id: number;
  question: string;
  onCorrect: () => void;
  onIncorrect: () => void;
};

type FormData = {
  answer: string;
};

export function OpenQuestion({ id, question, onCorrect, onIncorrect }: Props) {
  const { register, handleSubmit } = useForm<FormData>();
  const validateAnswer = ({ answer }: FormData) => {
    unauthorizedRequest(`/api/questions/${id}`, {
      method: "POST",
      body: JSON.stringify([answer]),
    })
      .then((response) => response.json())
      .then(({ is_correct }) => {
        if (is_correct) {
          return onCorrect();
        } else {
          return onIncorrect();
        }
      });
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
  return answer.trim().replaceAll(clonedSpace, " ");
}
