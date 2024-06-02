"use client";


import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { ArrowUpRight } from "lucide-react"
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useFetchCustomersQuery } from "@/app/(app)/customers/misc/queries";

function BaseLayout({children}:{children:React.ReactNode}){
  return (
    <Card
      className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
    >
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Customers</CardTitle>
          <CardDescription>
            These are some of your customers
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/customers">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
  </Card>
  )

}

export function CustomerList() {

  const {isLoading, isSuccess, data, isError, error} = useFetchCustomersQuery({limit:5})

  if (isLoading){
    return (
      <BaseLayout>
        <p>Loading Customers</p>
      </BaseLayout>
    )
  }

  if (isError){
    return (
      <BaseLayout>
        <p>Error Loading customers</p>
      </BaseLayout>
    )
  }

  return (
    <BaseLayout>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map(customer=>(
            <TableRow key={customer.customer_id}>
              <TableCell>
                <div className="font-medium">{customer.fullname}</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  {customer.email}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/customers/${customer.customer_id}`}>View</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseLayout>
  );
}
