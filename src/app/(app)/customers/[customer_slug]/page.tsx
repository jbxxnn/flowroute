'use client'

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { fetchCustomerQuery } from "../misc/queries";

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
  const {data, isLoading, isError, error} = fetchCustomerQuery({customer_slug:params.customer_slug})

  if (isLoading){
    return (
      <BaseLayout>
        Loading
      </BaseLayout>
    )
  }
  else if (isError){
    return (
      <BaseLayout>
        <p>Error loading customer, {error.message||"something went wrong"}</p>
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
              <Button>
                Create Subscription
              </Button>
              <Button variant="outline">
                Edit User
              </Button>
            </div>
          </div>
        </div>
        <div className="container mx-auto min-h-[200px] bg-white p-4">
          some extra information
        </div>
      </main>
    </BaseLayout>
  )

}
