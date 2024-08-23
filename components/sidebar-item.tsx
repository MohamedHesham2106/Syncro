"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Notebook } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Link from "next/link";

type TProps = {
  label: string;
  icon: "grid" | "home" | "paper";
  href: string;
};

const iconMap = {
  grid: LayoutGrid,
  home: Home,
  paper: Notebook,
};

export const SidebarItem: FC<TProps> = ({ href, icon, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  // Get the appropriate icon component from the map
  const IconComponent = iconMap[icon];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={href}>
            <Button variant={isActive ? "primary" : "ghost"} size="icon">
              <IconComponent className="w-5 h-5 cursor-pointer " />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          <span>{label}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
