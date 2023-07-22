import { HTMLProps, Ref, forwardRef } from "react";
import styles from "./styles.module.css";

type Props = HTMLProps<HTMLTextAreaElement> & {
  refObject?: Ref<HTMLTextAreaElement>;
};

export const Textarea = forwardRef(
  (
    props: HTMLProps<HTMLTextAreaElement>,
    refObject: Ref<HTMLTextAreaElement>
  ) => <TextareaComponent {...props} ref={null} refObject={refObject} />
);

function TextareaComponent({ refObject, ...props }: Props) {
  return <textarea {...props} className={styles.textarea} ref={refObject} />;
}
