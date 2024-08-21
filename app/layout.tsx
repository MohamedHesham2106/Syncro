import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import { TrpcProvider } from "@/components/providers/trpc-provider";

const font = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900", "1000"],
});

export const metadata: Metadata = {
  title: "Syncro",
  description: "Project management tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      afterSignOutUrl="/"
      afterSignInUrl="/projects"
      appearance={{
        baseTheme: neobrutalism,
        variables: {
          colorPrimary: "#6366f1",
        },
      }}
    >
      <html lang="en">
        <TrpcProvider>
          <body className={font.className}>{children}</body>
        </TrpcProvider>
      </html>
    </ClerkProvider>
  );
}
