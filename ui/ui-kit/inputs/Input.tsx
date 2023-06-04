import { HTMLProps, Ref, forwardRef } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

type Props = HTMLProps<HTMLInputElement> & {
  refObject?: Ref<HTMLInputElement>;
};

export const Input = forwardRef(
  (props: HTMLProps<HTMLInputElement>, refObject: Ref<HTMLInputElement>) => (
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
    </>
  );
}
