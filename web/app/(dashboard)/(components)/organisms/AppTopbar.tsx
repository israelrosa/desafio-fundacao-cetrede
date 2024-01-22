import Image from "next/image";
import { Toolbar } from "primereact/toolbar";
import React from "react";

export default function AppTopbar(): React.ReactNode {
  const startContent = (
    <Image src="/assets/gov.png" alt="gov_logo" width={80} height={100} />
  );

  return <Toolbar className="px-12 rounded-none" start={startContent} />;
}
