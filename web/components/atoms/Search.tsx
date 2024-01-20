import { InputText } from "primereact/inputtext";
import React from "react";


export default function Search(): React.ReactNode {  
  return (
    <span className="p-input-icon-left">
      <i className="pi pi-search" />
      <InputText placeholder="Keyword Search" />
    </span>
  )
}
