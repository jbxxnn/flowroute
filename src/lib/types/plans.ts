export type PlanTypes = "metered" | "unmetered" | "others" | string;
export type Plan = {
  id:string;
  plan_name:string;
  included_minutes: string;
  plan_price:string;
  plan_type:PlanTypes;
  additional_minutes: string;
  included_numbers:string;
  number_cost: string;
  included_channels: string;
  cost_additional_channels: string;
}

export type AddPlanFormData = Omit<Plan, "id"> 
