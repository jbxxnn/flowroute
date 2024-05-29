'use client'

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { fetchCustomerQuery } from "../misc/queries";
import { useMutation } from "@tanstack/react-query";
import { createCustomerSubscription } from "../misc/apis";

function BaseLayout({children}:{children:React.ReactNode}){
  return (
    <>
      <ContentLayout title="Customer">
        <div className="invisible"/>
      </ContentLayout>
    {children}
    </>
  )

}

export default function CustomerDetail({params}:{params: {customer_slug:string}}){
  const {data, refetch, isLoading, isError, error} = fetchCustomerQuery({customer_slug:params.customer_slug})
  const createSubscriptionMutation = useMutation({
    mutationFn:createCustomerSubscription,
    onSuccess: ()=>{
      refetch()
    }
  })

  function handleCreateUserSubscription(){
    createSubscriptionMutation.mutate(params.customer_slug)
  }

  if (isLoading){
    return (
      <BaseLayout>
        <div className="max-w-2xl mx-auto p-4 bg-white grid place-items-center">
          Loading customer...
        </div>
      </BaseLayout>
    )
  }
  if (isError){
    return (
      <BaseLayout>
        <div className="max-w-2xl mx-auto p-4 bg-white grid place-items-center">
          <p className="text-red-500">{error.message||"something went wrong"}</p>
        </div>
      </BaseLayout>
    )
  }
  return (
    <BaseLayout>

      <main className="space-y-4">
        <div className="bg-white p-6 -mt-14">
          <div className="flex gap-4 max-md:flex-col justify-between items-center">
            <ul className="flex gap-2 divide-x">
              {
                [
                  {name:"name", value:data?.fullname},
                  {name:"phone", value:data?.phone},
                  {name:"email", value:data?.email},
                ].map(item=>(
                  <li key={item.name} className="px-4">
                    <div>
                      <h3 className="uppercase text-gray-500">{item.name}</h3>
                      <p className="text-xl">{item.value}</p>
                    </div>
                  </li>
                ))
              }
            </ul>
            <div className="flex gap-2">
              <Button busy={createSubscriptionMutation.isPending} onClick={handleCreateUserSubscription}>
                Create Subscription
              </Button>
              <Button variant="outline">
                Edit User
              </Button>
            </div>
          </div>
        </div>
        <div className="container mx-auto min-h-[200px] grid md:grid-cols-4 gap-4">
          <div className="md:col-span-3 bg-white p-4 space-y-8 shadow-lg">
            <section className="space-y-2">
              <h2 className="text-m font-bold">
                Subscriptions
              </h2>
              <ul>
                <li className="text-sm">Subscription</li>
              </ul>
            </section>
            <section className="space-y-2 border-t py-4">
              <h2 className="text-m font-bold">
                Payments
              </h2>
              <div className="border border-dashed p-8 grid place-items-center text-center text-sm">
                <p>No payments yet</p>
              </div>
              <ul>
                <li className="text-sm">Payment</li>
              </ul>
            </section>
            <section className="space-y-2 border-t py-4">
              <h2 className="text-m font-bold">
                Payment Methods
              </h2>
              <ul>
                <li className="text-sm">Payment method</li>
              </ul>
            </section>
            <section className="space-y-2 border-t py-4">
              <h2 className="text-m font-bold">
                Invioces
              </h2>
              <ul>
                <li className="text-sm">Invoice</li>
              </ul>
            </section>
            <section className="space-y-2 border-t py-4">
              <h2 className="text-m font-bold">
                Pending Invoices
              </h2>
              <ul>
                <li className="text-sm">Invoice</li>
              </ul>
            </section>
          </div>
          <div className="bg-white p-4 space-y-8 shadow-lg">
            <section className="space-y-2">
              <h2 className="text-sm font-bold">
                Insights
              </h2>
              <ul>
                <li>
                  <div>
                    <h3 className="text-gray-400 font-semibold">Spent</h3>
                    <p className="text-lg">$2,934.02</p>
                  </div>
                </li>
              </ul>
            </section>
            <section className="space-y-2 border-t py-4">
              <h2 className="text-sm font-bold">
                Details
              </h2>
              <ul className="space-y-2">
                <li>
                  <div>
                    <h3 className="text-gray-400 font-semibold">Customer ID</h3>
                    <p className="text-lg">{data?.customer_id}</p>
                  </div>
                </li>
                <li>
                  <div>
                    <h3 className="text-gray-400 font-semibold">Customer since</h3>
                    <p className="text-lg">{new Date().toLocaleDateString()}</p>
                  </div>
                </li>
                <li>
                  <div>
                    <h3 className="text-gray-400 font-semibold">Billing details</h3>
                    <p className="text-lg">Billing details</p>
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </BaseLayout>
  )

}
