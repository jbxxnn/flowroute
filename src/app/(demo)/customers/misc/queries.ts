import { useQuery } from "@tanstack/react-query";
import { fetchCustomersAPI } from "./apis";

const BASE_QUERY_KEYS = ["customers"]

type FetchCustomerProps = {
  queryKey?:string[],
}

export function fetchCustomersQuery({queryKey=[]}:FetchCustomerProps = {}){
  return useQuery({
    queryFn: fetchCustomersAPI,
    queryKey: BASE_QUERY_KEYS.concat(queryKey)
  })
}
