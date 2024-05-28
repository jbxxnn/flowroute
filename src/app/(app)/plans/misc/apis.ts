import { AddPlanFormData, Plan } from "@/lib/types/plans";

export async function createNewPlanAPI(plan:AddPlanFormData){
  return await fetch("/api/plans", {
    method: "POST",
    body: JSON.stringify(plan),
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

export async function fetchPlansAPI():Promise<Plan[]>{
  return await fetch("/api/plans").then(res=>res.json())
}
