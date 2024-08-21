"use client";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

type TProps = {
  projectId: string;
};

export const ProjectOptionButton = ({ projectId }: Readonly<TProps>) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <Popover>
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Ellipsis />
              </Button>
            </TooltipTrigger>
          </PopoverTrigger>
          <TooltipContent>Options</TooltipContent>
          <PopoverContent className="w-24 p-2">
            <div className="flex flex-col gap-y-1">
              <Button size="sm" className="px-3 py-1">
                Edit
              </Button>
              <Button size="sm" className="px-3 py-1" variant="danger">
                Delete
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </Tooltip>
    </TooltipProvider>
  );
};
