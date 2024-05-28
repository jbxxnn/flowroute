export type Customer = {
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
  metered_billing_plan: string;
  metered_sip_trunk_usage: number;
  cloud_server_hosting_subscription: number;
  product_id: string;
}

export type AddCustomerFormData = Omit<Customer, "customer_id"|"product_id"> 
