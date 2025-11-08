import { z } from 'zod';

export const aiSchema = z.object({
  title: z.string(),
  servings: z.number().optional(),
  total_time: z.string().optional(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  notes: z.string().optional(),
});

