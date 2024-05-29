import { z } from 'zod';

export const planFormSchema = z.object({
  plan_name: z.string().min(2, {
    message: 'Plan name must be at least 2 characters.',
  }),
  plan_description: z.string().min(2, {
    message: 'Plan description must be at least 2 characters.',
  }),
  included_minutes: z.string().min(2, {
    message: 'Included minutes must be a number.',
  }),
  plan_price: z.string().min(2, {
    message: 'Plan Price must be a number.',
  }),

});
