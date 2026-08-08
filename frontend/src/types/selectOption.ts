import type { ReactNode } from "react";

export interface SelectOption {
  label: string;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
}