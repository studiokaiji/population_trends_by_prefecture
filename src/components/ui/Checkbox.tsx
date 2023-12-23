import { type HTMLAttributes, useId } from "react";
import "./Checkbox.css";

type CheckboxProps = HTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Checkbox = (props: CheckboxProps) => {
  const id = useId();
  return (
    <div
      id={props.id}
      className={`checkbox-wrapper ${props.className || ""}`}
      style={props.style}
    >
      <input {...props} id={id} type="checkbox" />
      <label htmlFor={id}>{props.label}</label>
    </div>
  );
};
