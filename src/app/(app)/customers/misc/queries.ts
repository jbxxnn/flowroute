import { useQuery } from "@tanstack/react-query";
import { fetchCustomerAPI, fetchCustomerStripeDataAPI, fetchCustomersAPI, fetchCustomersCountAPI, fetchCustomersSubscriptionsCountAPI } from "./apis";

const BASE_QUERY_KEYS = ["customers"]

type FetchCustomersProps = {
  queryKey?:string[],
  limit?:number, 
}

type FetchCustomersSubscriptionsProps = {
  queryKey?:string[],
  status?: string, 
}

type FetchCustomerProps = {
  queryKey?:string[],
  customer_slug:string, 
}
type FetchCustomerStripeDataProps = FetchCustomerProps & {
  enabled:boolean
}

export function useFetchCustomersQuery({queryKey=[], limit}:FetchCustomersProps = {}){
  return useQuery({
    queryFn: async ()=> await fetchCustomersAPI({limit}),
    queryKey: BASE_QUERY_KEYS.concat([...queryKey, "limit="+limit])
  })
}

export function useFetchCustomersCountQuery({queryKey=[]}:FetchCustomersProps = {}){
  return useQuery({
    queryFn: async ()=> await fetchCustomersCountAPI(),
    queryKey: BASE_QUERY_KEYS.concat([...queryKey,])
  })
}


export function useFetchCustomersSubscriptionsCountQuery({queryKey=[], status}:FetchCustomersSubscriptionsProps = {}){
  return useQuery({
    queryFn: async ()=> await fetchCustomersSubscriptionsCountAPI({status}),
    queryKey: ["customer_subscriptions"].concat([...queryKey,])
  })
}


export function useFetchCustomerQuery({customer_slug, queryKey=[]}:FetchCustomerProps){
  return useQuery({
    queryFn: async()=> await fetchCustomerAPI(customer_slug),
    queryKey: BASE_QUERY_KEYS.concat([...queryKey, customer_slug])
  })
}

export function useFetchCustomerStripeDataQuery({customer_slug, queryKey=[], enabled=true}:FetchCustomerStripeDataProps){
  return useQuery({
    queryFn: async()=> await fetchCustomerStripeDataAPI(customer_slug),
    queryKey: BASE_QUERY_KEYS.concat([...queryKey, "stripe data", customer_slug]),
    enabled
  })
}
