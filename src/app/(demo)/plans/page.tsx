import Link from "next/link";
import { Payment, columns } from "./plan-columns";
import { DataTable } from "./plan-table";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";



async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 25,
      included_minutes: 800,
      name: "Basic",
    },
    {
      id: "728ed53d",
      amount: 40,
      included_minutes: 1300,
      name: "Advance",
    },
    {
      id: "728ed59h",
      amount: 55,
      included_minutes: 1900,
      name: "Premium",
    },
    // ...
  ]
}




export default async function PostsPage() {

  const data = await getData()

  return (
    <ContentLayout title="All Customers">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Phone Plans</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
      </div>
    </ContentLayout>
  );
}
