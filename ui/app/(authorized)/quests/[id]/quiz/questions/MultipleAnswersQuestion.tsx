import { unauthorizedRequest } from "@/app/api/unauthorizedRequest";
import { Checkbox } from "@/ui-kit/inputs/Checkbox";
import { useForm } from "react-hook-form";
import styles from "../page.module.css";

type Props = {
  id: number;
  question: string;
  answers: string[];
  onCorrect: () => void;
  onIncorrect: () => void;
};

type FormData = {
  answers: string[];
};

export function MultipleAnswersQuestion({
  id,
  question,
  answers,
  onCorrect,
  onIncorrect,
}: Props) {
  const { register, handleSubmit } = useForm<FormData>();

  const validateAnswer = ({ answers: givenAnswers }: FormData) => {
    unauthorizedRequest(`/api/questions/${id}`, {
      method: "POST",
      body: JSON.stringify(givenAnswers),
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
          {answers.map((option) => (
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
