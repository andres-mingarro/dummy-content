"use client";

import styles from "./ResetLink.module.scss";

interface ResetLinkProps {
  children: React.ReactNode;
  onClick: () => void;
}

export default function ResetLink({ children, onClick }: ResetLinkProps) {
  return (
    <button type="button" className={`${styles["reset-link"]} ResetLink`} onClick={onClick}>
      {children}
    </button>
  );
}
