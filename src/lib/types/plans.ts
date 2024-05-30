export type Plan = {
  id:string;
  plan_name:string;
  included_minutes:string;
  plan_price:string;
  plan_type:"primary"|"secondary" | string;
}

export type AddPlanFormData = Omit<Plan, "id"> 
