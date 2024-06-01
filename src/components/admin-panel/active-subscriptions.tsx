"use client";

import { CreditCard } from "lucide-react"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { fetchCustomersSubscriptionsCountQuery } from "@/app/(app)/customers/misc/queries";

function BaseLayout({children}:{children:React.ReactNode}){
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Active Subscriptions
        </CardTitle>
        <CreditCard className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

export function ActiveSubscriptions() {

  const {isLoading, isSuccess, data, isError, error} = fetchCustomersSubscriptionsCountQuery({status:"active"})

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
          Error loading plans
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
