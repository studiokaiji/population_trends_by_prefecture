import { type ChangeEvent, useId } from "react";
import styles from "./Checkbox.module.css";

type CheckboxProps = {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?(event: ChangeEvent): void;
};

export const Checkbox = ({
  label,
  checked,
  defaultChecked,
  onChange,
}: CheckboxProps) => {
  const id = useId();
  return (
    <span className={styles.module}>
      <input
        id={id}
        type="checkbox"
        className={styles.checkbox}
        onChange={onChange}
        checked={checked}
        defaultChecked={defaultChecked}
      />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </span>
  );
};
