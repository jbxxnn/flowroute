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


export async function fetchCustomerAPI(customer_slug:string):Promise<Customer>{
  return await fetch(`/api/customers/${customer_slug}`).then(res=>res.json())
}
