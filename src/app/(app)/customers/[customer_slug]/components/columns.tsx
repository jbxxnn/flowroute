"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Customer } from "@/lib/types/customers"
import { CustomStripeSubscription } from "@/lib/types/StripeData"

export const columns: ColumnDef<CustomStripeSubscription>[] = [
  {
    accessorKey: "plan.name",
    header: "Product",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "frequency",
    header: "Frequency",
  },
  {
    accessorKey: "upcoming_invoice.start",
    header: "Next Invoice",
  },
]
