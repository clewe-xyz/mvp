import { unauthorizedRequest } from "@/app/api/unauthorizedRequest";
import { RadioGroup } from "@/ui-kit/inputs/RadioGroup";
import { SpinnerSM } from "@/ui-kit/loaders";
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
  answer: string;
};

export function SingleAnswerQuestion({
  id,
  question,
  answers,
  onCorrect,
  onIncorrect,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitted },
  } = useForm<FormData>({
    defaultValues: {
      answer: "",
    },
  });
  const validateAnswer = (data: FormData) => {
    unauthorizedRequest(`/api/questions/${id}`, {
      method: "POST",
      body: JSON.stringify(data.answer),
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
          <RadioGroup {...register("answer")} labels={answers} />
        </div>
        <div className={styles.quizAnswerActions}>
          <button
            className={styles.answerButton}
            type="submit"
            disabled={isSubmitted}
          >
            {isSubmitted ? <SpinnerSM /> : "Answer"}
          </button>
        </div>
      </form>
    </>
  );
}
