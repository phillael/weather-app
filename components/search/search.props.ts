import { FormEvent } from "react";

export interface SearchProps {
  /** onChange handler for filter search */
  onSearchChange: (val: string) => void;
  /** Callback invoked when form is submitted */
  onSubmit: (val: string, e?: FormEvent) => void;
}
