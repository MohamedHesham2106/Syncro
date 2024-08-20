"use client";

import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type TProps = {
  className?: string;
};
export const Header = ({ className }: TProps) => {
  return (
    <div className={cn(className, "h-16 w-full px-4 fixed z-50 bg-white")}>
      <div className="lg:max-w-screen-xl mx-auto flex items-center justify-between h-full">
        <div className="py-7 pl-4 p flex items-center gap-x-3">
          <Link href="/">
            <h1 className="text-2xl font-extrabold text-black tracking-wide">
              <span className="text-indigo-500 text-3xl">S</span>yncro
            </h1>
          </Link>
        </div>
        <div className="py-7  pl-4 flex items-center gap-x-3">
          <ClerkLoading>
            <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-8 h-8 rounded-lg overflow-hidden",
                  },
                }}
              />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="primary" size="lg" className="font-extrabold">
                  Login
                </Button>
              </SignInButton>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
};
