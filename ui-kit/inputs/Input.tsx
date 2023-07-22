import { HTMLProps, Ref, forwardRef } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

type InputProps = HTMLProps<HTMLInputElement> & {
  error?: string;
};

type Props = InputProps & {
  refObject?: Ref<HTMLInputElement>;
};

export const Input = forwardRef(
  (props: InputProps, refObject: Ref<HTMLInputElement>) => (
    <InputComponent {...props} ref={null} refObject={refObject} />
  )
);

function InputComponent({ refObject, label, ...props }: Props) {
  return (
    <>
      {label ? (
        <div className={styles.inputLabel}>
          <label htmlFor={props.id}>{label}</label>
        </div>
      ) : null}
      <input
        {...props}
        type={props.type ?? "text"}
        className={classNames(styles.input, props.className)}
        id={props.id}
        ref={refObject}
      />
      {props.error ? (
        <span className={styles.errorMessage}>{props.error}</span>
      ) : null}
    </>
  );
}
