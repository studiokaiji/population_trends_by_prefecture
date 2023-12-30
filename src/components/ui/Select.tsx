import styles from "@/components/ui/Select.module.css";
import { useCallback } from "react";

type SelectProps = {
  options: {
    label?: string;
    value: string | number;
  }[];
  onSelect: (value: string) => void;
};

export const Select = ({ options, onSelect }: SelectProps) => {
  const selectHandler = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onSelect(e.target.value);
    },
    [onSelect],
  );

  return (
    <select className={styles.module} onChange={selectHandler}>
      {options.map(({ label, value }) => (
        <option key={`select-${value}`} value={value}>
          {label || value}
        </option>
      ))}
    </select>
  );
};
