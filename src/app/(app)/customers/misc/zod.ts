
import * as z from "zod";

export const customerFormSchema = z.object({
  fullname: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  phone: z.string().min(2, {
    message: 'Phone number is required',
  }).regex(new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  ), 'Please enter a valid phone number'),
  email: z.string().min(1, {
    message: 'Email must be at least 2 characters.',
  }).email("Please input a valid email"),
  street_address: z.string().min(2, {
    message: 'Street Address must be at least 2 characters.',
  }),
  city: z.string().min(2, {
    message: 'City must be at least 2 characters.',
  }),
  state: z.string().min(2, {
    message: 'State must be at least 2 characters.',
  }),
  zip_code: z.string().min(2, {
    message: 'ZipCode must be at least 2 characters.',
  }),
  access_key: z.string().min(2, {
    message: 'Customer Access Key must be at least 2 characters.',
  }),
  secret_key: z.string().min(2, {
    message: 'Customer Secret Key must be at least 2 characters.',
  }),

  extra_field: z.string(),

  billing_day: z.number({required_error:"This field is required"}),
  metered_billing_plan: z.string().min(2, {
    message: 'Metered Billing Plan must be at least 2 characters.',
  }),

  metered_sip_trunk_usage: z.string({required_error:'SIP Trunk usage is required.'}).min(1, {
    message: 'SIP Trunk usage must be at least 2 characters.',
  }),
  cloud_server_hosting_subscription: z.string({required_error: 'Cloud Server Hosting Subscription is required'}).min(1, {
    message: 'Cloud Server Hosting Subscription must be greater than 0.',
  }),
});
