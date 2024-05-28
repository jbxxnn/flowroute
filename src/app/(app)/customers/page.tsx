'use client'

import Link from "next/link";
import { columns } from "./columns"
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
import { fetchCustomersQuery } from "./misc/queries";

export default function PostsPage() {

  const {isLoading, isSuccess, data, isError, error} = fetchCustomersQuery()

  return (
    <ContentLayout title="All Customers">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Customers</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="container mx-auto py-10">
        {isError && (
        <p className="text-red-500 p-2">{error.message}</p>
        )}
        {isLoading ? (
        <p>Loading...</p>
        ): (
        <DataTable columns={columns} data={data||[]} />
        )}
      </div>
    </ContentLayout>
  );
}
