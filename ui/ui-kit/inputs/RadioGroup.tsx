import { ChangeEvent, HTMLProps, Ref, forwardRef, useState } from "react";
import styles from "./styles.module.css";

type Props = HTMLProps<HTMLInputElement> & {
  labels: string[];
};

type RadioGroupProps = Props & {
  refObject?: Ref<HTMLInputElement>;
};

export const RadioGroup = forwardRef(
  (props: Props, refObject: Ref<HTMLInputElement>) => (
    <RadioGroupComponent {...props} ref={null} refObject={refObject} />
  )
);

function RadioGroupComponent({
  refObject,
  name,
  labels,
  ...props
}: RadioGroupProps) {
  const [selected, setSelected] = useState<string>();
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
  };

  return (
    <>
      {labels.map((label) => {
        return (
          <span key={label} className={styles.radioContainer}>
            <input
              {...props}
              type="radio"
              name={name}
              value={label}
              checked={label.toLowerCase() === selected?.toLowerCase()}
              onChange={onInputChange}
              className={styles.radio}
              id={label}
              ref={refObject}
            />
            <label className={styles.radioLabel} htmlFor={label}>
              {label}
            </label>
          </span>
        );
      })}
    </>
  );
}
