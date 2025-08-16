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
import { Label } from "./ui/label";

interface CustomDatePickerProps {
  label: string;
  error?: string;
  containerStyles?: React.HTMLAttributes<HTMLDivElement>["className"];
}

export function CustomDatePicker({
  label,
  error,
  containerStyles,
}: CustomDatePickerProps) {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className={cn("space-y-4", containerStyles)}>
      <Label className={cn(error ? "text-red-500" : "")}>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-empty={!date}
            className={cn(
              "data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal",
              error && "border-red-500"
            )}
          >
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("w-auto p-0", error && "border-red-500")}>
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </PopoverContent>
      </Popover>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
