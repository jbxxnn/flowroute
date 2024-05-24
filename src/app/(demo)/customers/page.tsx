import Link from "next/link";
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
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
      amount: 100,
      status: "pending",
      email: "linda@example.com",
    },
    {
      id: "728ed53d",
      amount: 600,
      status: "processing",
      email: "jibrin@example.com",
    },
    {
      id: "728ed59h",
      amount: 300,
      status: "success",
      email: "james@example.com",
    },
    {
      id: "728ed50n",
      amount: 900,
      status: "pending",
      email: "daniel@example.com",
    },
    {
      id: "728ed51w",
      amount: 2000,
      status: "processing",
      email: "anna@example.com",
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
            <BreadcrumbPage>Customers</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
      </div>
    </ContentLayout>
  );
}
