import { HTMLProps, ReactNode, Ref, forwardRef } from "react";
import styles from "./styles.module.css";

type Props = Omit<HTMLProps<HTMLInputElement>, "label" | "as"> & {
  label: ReactNode;
};

type CheckboxProps = Props & {
  refObject?: Ref<HTMLInputElement>;
};

export const Checkbox = forwardRef(
  (props: Props, refObject: Ref<HTMLInputElement>) => (
    <CheckboxComponent {...props} ref={null} refObject={refObject} />
  )
);

function CheckboxComponent({ label, refObject, ...props }: CheckboxProps) {
  return (
    <span>
      <input
        {...props}
        className={styles.checkbox}
        type="checkbox"
        id={`${props.value}-salt`}
        ref={refObject}
      />
      <label className={styles.checkboxLabel} htmlFor={`${props.value}-salt`}>
        {label}
      </label>
    </span>
  );
}
