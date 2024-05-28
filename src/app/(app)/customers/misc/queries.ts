import { useQuery } from "@tanstack/react-query";
import { fetchCustomerAPI, fetchCustomersAPI } from "./apis";

const BASE_QUERY_KEYS = ["customers"]

type FetchCustomersProps = {
  queryKey?:string[],
}

type FetchCustomerProps = {
  queryKey?:string[],
  customer_slug:string, 
}

export function fetchCustomersQuery({queryKey=[]}:FetchCustomersProps = {}){
  return useQuery({
    queryFn: fetchCustomersAPI,
    queryKey: BASE_QUERY_KEYS.concat(queryKey)
  })
}


export function fetchCustomerQuery({customer_slug, queryKey=[]}:FetchCustomerProps){
  return useQuery({
    queryFn: async()=> await fetchCustomerAPI(customer_slug),
    queryKey: BASE_QUERY_KEYS.concat(queryKey)
  })
}
