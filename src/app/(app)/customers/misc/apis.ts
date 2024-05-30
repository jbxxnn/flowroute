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

export async function fetchCustomersAPI():Promise<Customer[]>{
  return await fetch("/api/customers").then(res=>res.json())
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
