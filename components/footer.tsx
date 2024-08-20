import React from "react";
import { Button } from "@/components/ui/button";
import { Facebook, Github, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 bg-white z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-center h-full gap-x-3">
        <Button
          size="lg"
          variant="primary"
          className="w-full text-white active:border-b-4"
        >
          © 2024 Mohamed Hesham. All rights reserved.
        </Button>
        <Button
          size="lg"
          className="bg-sky-500 text-primary-foreground hover:bg-sky-500/90 border-sky-600 border-b-4 active:border-b-0 w-fit"
        >
          <Linkedin className="rounded-md text-white" />
        </Button>
        <Button
          size="lg"
          className="bg-slate-800 text-primary-foreground hover:bg-slate-800/90 border-black border-b-4 active:border-b-0 w-fit"
        >
          <Github className="rounded-md text-white" />
        </Button>
      </div>
    </footer>
  );
};
