"use client";
import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import Lottie from "lottie-react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import logo from "@/public/main.json";
export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="w-[320px] h-[320px] lg:w-[550px] lg:h-[550px] mb-8 lg:mb-0">
        <Lottie animationData={logo} loop />
      </div>

      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[550px] text-center">
          Empower Your Projects. Simplify Your Success.
        </h1>
        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <ClerkLoading>
            <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton mode="modal">
                <Button className="w-full" variant="primary" size="lg">
                  Get Started
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button className="w-full" variant="primaryOutline" size="lg">
                  I already have an account
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button className="w-full" variant="primary" asChild size="lg">
                <Link href="/projects">My Projects</Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}
