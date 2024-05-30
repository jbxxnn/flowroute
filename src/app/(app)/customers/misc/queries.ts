import { useQuery } from "@tanstack/react-query";
import { fetchCustomerAPI, fetchCustomerStripeDataAPI, fetchCustomersAPI } from "./apis";

const BASE_QUERY_KEYS = ["customers"]

type FetchCustomersProps = {
  queryKey?:string[],
}

type FetchCustomerProps = {
  queryKey?:string[],
  customer_slug:string, 
}
type FetchCustomerStripeDataProps = FetchCustomerProps & {
  enabled:boolean
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
    queryKey: BASE_QUERY_KEYS.concat([...queryKey, customer_slug])
  })
}

export function fetchCustomerStripeDataQuery({customer_slug, queryKey=[], enabled=true}:FetchCustomerStripeDataProps){
  return useQuery({
    queryFn: async()=> await fetchCustomerStripeDataAPI(customer_slug),
    queryKey: BASE_QUERY_KEYS.concat([...queryKey, "stripe data", customer_slug]),
    enabled
  })
}
