
import * as z from "zod";

export const customerFormSchema = z
.object({
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
  billing_day: z.number(),

  subscription_type: z.string({required_error: "A subscription type is required"}),

  //primary
  phone_plan: z.string().optional(),
  extra_numbers: z.coerce.number().optional(),
  included_channels: z.coerce.number().optional(),

  //secondary
  metered_billing_plan: z.string().optional(),
  metered_sip_trunk_usage: z.string().optional(),
  cloud_server_hosting_subscription: z.string().optional(),

})
.superRefine(({subscription_type, phone_plan, metered_sip_trunk_usage, metered_billing_plan, cloud_server_hosting_subscription}, ctx)=>{

  if (subscription_type === "metered" ) {
    if (phone_plan===undefined) {
      ctx.addIssue({
        code: "custom",
        message: "A plan type is required",
        path: ["phone_plan"]
      })
    }
  }

  if (subscription_type === "unmetered" ) {
    if (phone_plan===undefined) {
      ctx.addIssue({
        code: "custom",
        message: "A plan type is required",
        path: ["phone_plan"]
      })
    }
  }

  if (subscription_type === "others" ) {

    if (metered_billing_plan===undefined) {
      ctx.addIssue({
        code: "custom",
        message: "This field is required",
        path: ["metered_billing_plan"]
      })
    }
    if (metered_sip_trunk_usage===undefined) {
      ctx.addIssue({
        code: "custom",
        message: "This field is required",
        path: ["metered_sip_trunk_usage"]
      })
    }
    if (cloud_server_hosting_subscription===undefined) {
      ctx.addIssue({
        code: "custom",
        message: "This field is required",
        path: ["cloud_server_hosting_subscription"]
      })
    }
    
  }
});
