import { z } from 'zod';

export const planFormSchema = z.object({
  plan_name: z.string().min(2, {
    message: 'Plan name must be at least 2 characters.',
  }),
  plan_type: z.string({required_error:"plan type is required"}),
  plan_price: z.string().min(1, {
    message: 'Plan Price must be a number.',
  }),
  plan_description: z.string().min(2, {
    message: 'Plan description must be at least 2 characters.',
  }),
  included_minutes: z.string().optional(),
  included_channels: z.string().optional(),
  cost_additional_channels: z.string().optional(),
  additional_minutes: z.string().optional(),
  included_numbers: z.string().optional(),
  number_cost: z.string().optional()

});
