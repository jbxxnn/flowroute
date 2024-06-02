'use client'

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { useFetchCustomerQuery, useFetchCustomerStripeDataQuery } from "../misc/queries";
import { useMutation } from "@tanstack/react-query";
import { createCustomerSubscription, } from "../misc/apis";
import { toast } from "sonner";
import { columns } from "./components/columns";
import { DataTable } from "./components/dataTable";
import { Card } from "@/components/ui/card";

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
  const {data, refetch, isLoading, isError, error} = useFetchCustomerQuery({customer_slug:params.customer_slug})

  const {data:stripe_data, refetch:refetchStripe, isLoading:isLoadingStripeData, isError:isStripeError, error:stripeError} = useFetchCustomerStripeDataQuery({customer_slug:data?.stripe_customer_id!, enabled:!!data})

  const createSubscriptionMutation = useMutation({
    mutationFn:createCustomerSubscription,
    onSuccess: ()=>{
      toast.success("Subscription created successfully!")
      refetch()
      refetchStripe()
    },
    onError: ()=>{
      toast.error("Error creating subscription")
    }
  })

  function handleCreateUserSubscription(){
    createSubscriptionMutation.mutate(params.customer_slug)
  }

  if (isLoading){
    return (
      <BaseLayout>
        <Card className="max-w-2xl mx-auto p-4  grid place-items-center">
          Loading customer...
        </Card>
      </BaseLayout>
    )
  }
  if (isError){
    return (
      <BaseLayout>
        <Card className="max-w-2xl mx-auto p-4 grid place-items-center">
          <p className="text-red-500">{error.message||"something went wrong"}</p>
        </Card>
      </BaseLayout>
    )
  }
  return (
    <BaseLayout>

      <main className="space-y-4">
        <Card className="p-6 -mt-14">
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
                      <h3 className="capitalize text-black-500 text-sm font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500 font-normal">{item.value}</p>
                    </div>
                  </li>
                ))
              }
            </ul>
            <div className="flex gap-2">
              {!isLoadingStripeData && (
                <>
                  {
                    (stripe_data?.subscriptions[0]?.status !== "active") ? (
                      <Button busy={createSubscriptionMutation.isPending} onClick={handleCreateUserSubscription}>
                        Create Subscription
                      </Button>
                    ): (
                        <Button variant="secondary" disabled>
                          Subscription is active
                        </Button>
                      )
                  }
                </>
              )}
              <Button variant="outline">
                Edit User
              </Button>
            </div>
          </div>
        </Card>
        <div className="container mx-auto min-h-[200px] grid md:grid-cols-4 gap-4">
          <Card className="md:col-span-3 p-4 space-y-8 shadow-lg">
            <section className="space-y-2">
              <h2 className="capitalize text-black-500 text-sm font-medium">
                Subscriptions
              </h2>

              {isLoadingStripeData && (
                <p>loading...</p>
              )}
              {isStripeError && (
                <p className="text-center p-4 text-red-500">Error loading data</p>
              )}
              {stripe_data && (
                <DataTable columns={columns} data={stripe_data?.subscriptions||[]} />
              )}
            </section>
            <section className="space-y-2 border-t py-4">
              <h2 className="capitalize text-black-500 text-sm font-medium">
                Payments
              </h2>
              <div className="border border-dashed p-8 grid place-items-center text-center text-sm">
                <p>No payments yet</p>
              </div>
              <ul>
                <li className="text-sm text-gray-500 font-normal">Payment</li>
              </ul>
            </section>
            <section className="space-y-2 border-t py-4">
              <h2 className="capitalize text-black-500 text-sm font-medium">
                Payment Methods
              </h2>
              <ul>
                <li className="text-sm text-gray-500 font-normal">Payment method</li>
              </ul>
            </section>
            <section className="space-y-2 border-t py-4">
              <h2 className="capitalize text-black-500 text-sm font-medium">
                Invioces
              </h2>
              <ul>
                <li className="text-sm text-gray-500 font-normal">Invoice</li>
              </ul>
            </section>
            <section className="space-y-2 border-t py-4">
              <h2 className="capitalize text-black-500 text-sm font-medium">
                Pending Invoices
              </h2>
              <ul>
                <li className="text-sm text-gray-500 font-normal">Invoice</li>
              </ul>
            </section>
          </Card>
          <Card className="p-4 space-y-8 shadow-lg">
            <section className="space-y-2">
              <h2 className="capitalize text-black-500 text-sm font-medium">
                Insights
              </h2>
              <ul>
                <li>
                  <div>
                    <h3 className="text-sm text-black-500 font-normal">Spent</h3>
                    <p className="text-sm text-gray-500">$2,934.02</p>
                  </div>
                </li>
              </ul>
            </section>
            <section className="space-y-2 border-t py-4">
              {
                isLoadingStripeData && (
                  <div>
                    <p>Loading data...</p>
                  </div>
                )
              }

              {
                isStripeError && (
                  <div>
                    <p>Error loading data...</p>
                  </div>
                )
              }
              {
                stripe_data && (
                  <ul className="space-y-4">
                    <ul className="space-y-2 pl-4">
                      <h2 className="-ml-4 text-gray-700 font-bold text-sm">Details</h2>
                      <li>
                        <div>
                          <h2 className="text-sm text-black-500 font-normal">Customer ID</h2>
                          <p className="text-sm text-gray-500">{stripe_data.customer.id}</p>
                        </div>
                      </li>
                      <li>
                        <div>
                          <h2 className="text-sm text-black-500 font-normal">Customer since</h2>
                          <p className="text-sm text-gray-500">{new Date(stripe_data.customer.created * 1000).toLocaleDateString()}</p>
                        </div>
                      </li>
                    </ul>
                    <li>
                      <ul className="space-y-2 pl-4">
                        <h2 className="-ml-4 text-gray-700 font-bold text-sm">Billing Details</h2>
                        <li>
                          <div>
                            <h3 className="text-sm text-black-500 font-normal">Email</h3>
                            <p className="text-sm text-gray-500">{stripe_data.customer.email}</p>
                          </div>
                        </li>
                        <li>
                          <div>
                            <h3 className="text-sm text-black-500 font-normal">Phone</h3>
                            <p className="text-sm text-gray-500">{stripe_data.customer.phone}</p>
                          </div>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <ul className="space-y-2 pl-4">
                        <h2 className="-ml-4 text-gray-700 font-bold text-sm">Shipping Details</h2>
                        <li>
                          <div>
                            <h3 className="text-sm text-black-500 font-normal">Name</h3>
                            <p className="text-sm text-gray-500">{stripe_data.customer.shipping?.name}</p>
                          </div>
                        </li>
                        <li>
                          <div>
                            <h3 className="text-sm text-black-500 font-normal">Address</h3>
                            <p className="text-sm text-gray-500 flex flex-col">
                              <span> {stripe_data.customer.shipping?.address?.line1}, </span>
                              <span> {stripe_data.customer.shipping?.address?.city}, {stripe_data.customer.shipping?.address?.state}, {stripe_data.customer.shipping?.address?.country}</span>
                              <span> {stripe_data.customer.shipping?.address?.postal_code}, </span>
                              <span> {stripe_data.customer.shipping?.phone} </span>
                            </p>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>

                )
              }

            </section>
          </Card>
        </div>
      </main>
    </BaseLayout>
  )

}

