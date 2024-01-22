import React from "react";
import AppTopbar from "./(components)/organisms/AppTopbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return (
    <>
      <AppTopbar />
      <main className="w-full h-full overflow-auto">{children}</main>
    </>
  );
}
