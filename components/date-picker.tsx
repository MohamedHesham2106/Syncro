"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

type TProps = {
  onDateChange: (date: string) => void;
};

export const DatePicker = ({ onDateChange }: TProps) => {
  const [date, setDate] = useState<Date>();

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      onDateChange(new Date(selectedDate).toLocaleDateString());
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "font-normal col-span-9 w-full",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick Target Date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
