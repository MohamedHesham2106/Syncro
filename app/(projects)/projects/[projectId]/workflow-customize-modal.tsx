"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ModalType, useTriggerModal } from "@/hooks/use-trigger-modal";
import { Separator } from "@/components/ui/separator";
import { useSections } from "@/hooks/use-sections";
import { useTransition } from "react";

type TProps = {
  sections: Section[];
};

const descriptions = [
  "for product manager/owner to create requirements.",
  "for designers to create UI/UX Design.",
  "for engineers to create technical design.",
  "for product owners to create development plan.",
  "for QA Engineers to create QA Plan.",
  "for project owners to create Release checklist.",
];


export const WorkflowCustomizeModal = ({ sections }: TProps) => {
  const { isOpen, type, close, open } = useTriggerModal();
  const { addSection, removeSection } = useSections();
  const [isPending, startTransition] = useTransition();
  const openModal = isOpen && type === ModalType.CustomizeWorkflow;

  const handleToggleSection = (section: Section) => {
    startTransition(() => {
      if (!section.deleted) {
        removeSection({
          sectionId: section.id,
          projectId: section.projectId,
        });
      } else {
        addSection({
          sectionId: section.id,
          projectId: section.projectId,
        });
      }
    });
  };

  return (
    <Dialog
      open={openModal}
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <div className="flex items-center justify-end w-full">
        <DialogTrigger
          onClick={() => open(ModalType.CustomizeWorkflow)}
          asChild
        >
          <Button
            variant="ghost"
            className="text-primary tracking-wide font-semibold"
          >
            Customize
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="max-w-sm md:max-w-lg p-4 md:p-6">
        <DialogHeader>
          <DialogTitle className="font-extrabold text-lg md:text-2xl">
            Customize Project Workflow
          </DialogTitle>
          <DialogDescription className="text-xs md:text-sm">
            Check the boxes below to customize the project workflow.
          </DialogDescription>
        </DialogHeader>
        <Separator className="bg-slate-300 h-[1px]" />
        <div className="flex flex-col space-y-4">
          {sections.map((section, i) => (
            <div key={section.id} className="flex items-center gap-x-2">
              <Checkbox
                disabled={isPending}
                defaultChecked={!section.deleted}
                id={section.id}
                onClick={() => handleToggleSection(section)}
              />
              <Label
                htmlFor={section.id}
                className="font-bold text-xs md:text-sm"
              >
                {section.name}
              </Label>
              <span className="text-slate-400 text-xs md:text-base">
                {descriptions[i]}
              </span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
