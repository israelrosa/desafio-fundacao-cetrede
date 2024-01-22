import { InputText, type InputTextProps } from "primereact/inputtext";
import React from "react";

export interface SearchProps extends InputTextProps {}

export default function Search({
  className,
  ...rest
}: SearchProps): React.ReactNode {
  const customClassName = `p-input-icon-left ${className}`;

  return (
    <span className={customClassName}>
      <i className="pi pi-search" />
      <InputText {...rest} />
    </span>
  );
}
