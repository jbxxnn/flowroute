export type PlanTypes = "primary" | "secondary" | string;
export type Plan = {
  id:string;
  plan_name:string;
  included_minutes:string;
  plan_price:string;
  plan_type:PlanTypes;
  additional_minutes:string;
  included_numbers:string;
  number_cost:string;
}

export type AddPlanFormData = Omit<Plan, "id"> 
