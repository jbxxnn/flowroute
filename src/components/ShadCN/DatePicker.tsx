import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Props =  {
  value: Date;
  displayed_value?: string | number;
  onValueChange: (val?:Date)=>void;
}

export function DatePicker({value, displayed_value, onValueChange}:Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {
            displayed_value ? displayed_value :
            value ? format(value, "PPP") : <span>Pick a date</span>
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onValueChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
