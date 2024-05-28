'use client'

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
import { fetchPlansQuery } from "./misc/queries";



export default function PostsPage() {

  const {data, isLoading, isError, error} = fetchPlansQuery()

  return (
    <ContentLayout title="All Phone Plans">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Phone Plans</BreadcrumbPage>
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
