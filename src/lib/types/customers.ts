export type Customer = {
  id:string;
  fullname : string;
  phone : string;
  email : string;
  street_address : string;
  city : string;
  state : string;
  zipcode : string;
  customer_secret_key: string;
  customer_access_key: string;
  customer_billing_day: number;
  metered_billing_plan: string;
  metered_SIP_trunk_usage: string;
  cloud_server_hosting_subscription: string;
}

export type AddCustomerFormData = Omit<Customer, "id"> 
