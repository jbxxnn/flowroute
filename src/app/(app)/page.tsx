
import { Navbar } from "@/components/admin-panel/navbar";
import { CustomerList } from "@/components/admin-panel/customer-list-dashboard";
import { RecentList } from "@/components/admin-panel/recent-sale-list";
import { TotalCustomers } from "@/components/admin-panel/total-customer";
import { ActiveSubscriptions } from "@/components/admin-panel/active-subscriptions";
import { PricePlans } from "@/components/admin-panel/sales-card";



export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
     <Navbar title={"Dashboard"} />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <TotalCustomers />
          <ActiveSubscriptions />
          <PricePlans />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <CustomerList />
        {/* <RecentList /> */}
        </div>
      </main>
    </div>
  )
}
