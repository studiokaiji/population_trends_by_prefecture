import { type ReactNode } from "react";
import styles from "@/components/layout/ScreenCenter.module.css";

type ScreenCenterProps = {
  children: ReactNode;
};

export const ScreenCenter = ({ children }: ScreenCenterProps) => {
  return <div className={styles.module}>{children}</div>;
};
