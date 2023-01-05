import { FormEvent } from "react";

export interface SearchProps {
  /** onChange handler for filter search */
  onSearchChange: (val: string) => void;
}
