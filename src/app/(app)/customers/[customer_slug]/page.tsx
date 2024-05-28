import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";

export default function CustomerDetail({params}:{params: {customer_slug:string}}){
  return (
    <>
      <ContentLayout title="Customer">
        <div className="invisible"/>
      </ContentLayout>
      <main className="space-y-4">
        <div className="bg-white p-6 -mt-14">
          <div className="flex gap-4 max-md:flex-col justify-between items-center">
            <ul className="flex gap-2 divide-x">
              {
                [
                  {name:"name", value:"user name"},
                  {name:"phone", value:"user phone"},
                  {name:"email", value:"user email"},
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
          {/* <p>User detail {params.customer_slug}</p> */}
        </div>
        <div className="container mx-auto min-h-[200px] bg-white p-4">
          some extra information
        </div>
      </main>
    </>
  )

}
