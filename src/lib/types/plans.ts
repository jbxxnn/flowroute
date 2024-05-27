export type Plan = {
  id:string;
  plan_name:string;
  included_minutes:string;
  plan_price:string;
}

export type AddPlanFormData = Omit<Plan, "id"> 
