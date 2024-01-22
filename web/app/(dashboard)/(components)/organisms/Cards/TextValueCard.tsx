import { Card } from "primereact/card";
import React from "react";

interface TextValueCardProps {
  title: string;
  value: string | number | undefined;
}

export default function TextValueCard({
  title,
  value = 0,
}: TextValueCardProps): React.ReactNode {
  const valueFormatted =
    typeof value === "number"
      ? new Intl.NumberFormat("pt-BR").format(value)
      : value;

  return (
    <Card className="flex-1 h-full overflow-hidden" title={title}>
      <span className="text-3xl">{valueFormatted}</span>
    </Card>
  );
}
