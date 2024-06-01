import { useQuery } from "@tanstack/react-query";
import { fetchCustomerAPI, fetchCustomerStripeDataAPI, fetchCustomersAPI } from "./apis";

const BASE_QUERY_KEYS = ["customers"]

type FetchCustomersProps = {
  queryKey?:string[],
  limit?:number, 
}

type FetchCustomerProps = {
  queryKey?:string[],
  customer_slug:string, 
}
type FetchCustomerStripeDataProps = FetchCustomerProps & {
  enabled:boolean
}

export function fetchCustomersQuery({queryKey=[], limit}:FetchCustomersProps = {}){
  return useQuery({
    queryFn: async ()=> await fetchCustomersAPI({limit}),
    queryKey: BASE_QUERY_KEYS.concat([...queryKey, "limit="+limit])
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
