import { StripeData, StripeDataEndpointResponse } from "@/lib/types/StripeData";
import { AddCustomerFormData, Customer } from "@/lib/types/customers";

export async function addCustomerAPI(customer:AddCustomerFormData){
  return await fetch("/api/customers", {
    method: "POST",
    body: JSON.stringify(customer),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res=>{
      if (res.ok){
        return res.json()
      }
      else throw(res)
    });
}

type FetchCustomersAPIProps = {
  limit?: number
}
type FetchCustomersSubscriptionsAPIProps = {
  status?: string
}
export async function fetchCustomersAPI({limit}:FetchCustomersAPIProps):Promise<Customer[]>{
  let url_search_params = new URLSearchParams("")
  if (limit){
    url_search_params.set("limit", String(limit))
  }
  return await fetch("/api/customers?" + url_search_params.toString()).then(res=>res.json())
}

export async function fetchCustomersCountAPI():Promise<number>{
  let url_search_params = new URLSearchParams("")
  return await fetch("/api/customers/count?" + url_search_params.toString()).then(res=>res.json())
}

export async function fetchCustomersSubscriptionsCountAPI({status}:FetchCustomersSubscriptionsAPIProps):Promise<number>{
  let url_search_params = new URLSearchParams("")
  if (status){
    url_search_params.set("status", status)
  }
  return await fetch("/api/customers/subscriptions/count?" + url_search_params.toString()).then(res=>res.json())
}


export async function createCustomerSubscription(customer_slug:string):Promise<void>{
  return await fetch(`/api/customers/${customer_slug}/create-subscription`, {method:"POST"}).then(res=>res.json())
}


export async function fetchCustomerAPI(customer_slug:string):Promise<Customer>{
  return await fetch(`/api/customers/${customer_slug}`).then(async (res)=>{
    const _res = await res.json()
    if (res.ok){
      return _res
    }
    throw _res
  })
}

export async function fetchCustomerStripeDataAPI(customer_slug:string):Promise<StripeDataEndpointResponse>{
  return await fetch(`/api/customers/${customer_slug}/dashboard-data/`, {
    headers: {
      "Content-Type" : "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      customer_slug
    })
  }).then(async (res)=>{
    const _res = await res.json()
    if (res.ok){
      return _res
    }
    throw _res
  })
}
