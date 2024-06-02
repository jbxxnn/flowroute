"use client";
import { Users } from "lucide-react"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useFetchCustomersCountQuery } from "@/app/(app)/customers/misc/queries";


function BaseLayout({children}:{children:React.ReactNode}){
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Total Customers
        </CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

export function TotalCustomers() {

  const {isLoading, isSuccess, data, isError, error} = useFetchCustomersCountQuery()

  if (isLoading){
    return (
      <BaseLayout>
        <p className="text-xs text-muted-foreground">
          Loading...
        </p>
      </BaseLayout>
    )
  }

  if (isError){
    return (
      <BaseLayout >
        <p className="text-xs text-red-400">
          Error loading customers
        </p>
      </BaseLayout >
    )
  }

  return (

    <BaseLayout>
      <div className="text-2xl font-bold">{data}</div>
    </BaseLayout>
            
  );
}
