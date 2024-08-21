import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import React, { PropsWithChildren } from "react";

export default function ProjectLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <>
      <Sidebar className="hidden lg:flex" />
      <div className="relative min-h-screen flex flex-col">
        <Header className="border-b shadow" />
        <main className="mt-16 h-full lg:pl-[72px] pt-[50px] lg:pt-0">
          {children}
        </main>
      </div>
    </>
  );
}
