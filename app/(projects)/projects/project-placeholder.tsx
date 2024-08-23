"use client";
import { ModalType, useTriggerModal } from "@/hooks/use-trigger-modal";
import Image from "next/image";
export const ProjectPlaceholder = () => {
  const { open } = useTriggerModal();
  return (
    <div className="min-w-min-h-svh flex -mt-5 justify-center">
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="w-[250px] h-[250px] lg:w-[450px] lg:h-[450px] relative">
          <Image
            src="/project-placeholder.svg"
            fill
            alt="project-placeholder"
          />
        </div>
        <h1 className="text-3xl text-center font-bold">
          Welcome to <span className="text-primary">S</span>yncro
        </h1>
        <p>
          Please start by{" "}
          <button
            className="text-primary cursor-pointer"
            onClick={() => open(ModalType.AddProject)}
          >
            Adding a Project
          </button>{" "}
          to experience the magic of Syncro&#x21;
        </p>
      </div>
    </div>
  );
};
