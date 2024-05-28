import { useQuery } from "@tanstack/react-query";
import { fetchPlansAPI } from "./apis";

const BASE_QUERY_KEYS = ["plans"]

type FetchPlansQueryType = {
  query_key?: string[];
}

export function fetchPlansQuery({query_key=[]}:FetchPlansQueryType = {}){
  return useQuery({
    queryKey: BASE_QUERY_KEYS.concat(query_key),
    queryFn: fetchPlansAPI
  })
}
