import { Header } from "@/components/header";
import { PropsWithChildren } from "react";
import { Footer } from "@/components/footer";

export default function MainLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col items-center justify-center mt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
