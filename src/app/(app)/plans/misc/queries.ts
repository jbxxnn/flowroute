import { useQuery } from "@tanstack/react-query";
import { fetchPlansAPI, fetchPlansCountAPI } from "./apis";

const BASE_QUERY_KEYS = ["plans"]

type FetchPlansQueryType = {
  query_key?: string[];
}

export function useFetchPlansQuery({query_key=[]}:FetchPlansQueryType = {}){
  return useQuery({
    queryKey: BASE_QUERY_KEYS.concat(query_key),
    queryFn: fetchPlansAPI
  })
}


export function useFetchPlansCountQuery({query_key=[]}:FetchPlansQueryType = {}){
  return useQuery({
    queryKey: BASE_QUERY_KEYS.concat(query_key),
    queryFn: fetchPlansCountAPI
  })
}
