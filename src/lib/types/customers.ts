export type Customer = {
  stripe_customer_id:string;
  customer_id:string;
  fullname : string;
  phone : string;
  email : string;
  street_address : string;
  city : string;
  state : string;
  zip_code : string;
  secret_key: string;
  access_key: string;
  billing_day: number;
  
  // primary
  extra_numbers?: number;
  
  // secondary
  metered_billing_plan?: string;
  metered_sip_trunk_usage?: string|number;
  cloud_server_hosting_subscription?: string|number;

  product_id: string;
}

export type AddCustomerFormData = Omit<Customer, "customer_id"|"product_id" | "stripe_customer_id"> 
