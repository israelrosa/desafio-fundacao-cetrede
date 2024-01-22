import React from "react";
import { PrimeReactProvider } from "primereact/api";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "INSE 2021",
  description: "CENSO Escolar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return (
    <html lang="en">
      <PrimeReactProvider>
        <body className={inter.className}>{children}</body>
      </PrimeReactProvider>
    </html>
  );
}
