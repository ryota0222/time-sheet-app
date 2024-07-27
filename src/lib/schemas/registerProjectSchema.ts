import { z } from 'zod';

export const registerProjectSchema = z.object({
	name: z.string().min(1),
	color: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i),
	tax: z
		.number()
		.int()
		.refine((value) => value === 0 || value === 1, {
			message: 'Tax must be either 0 or 1'
		}),
	price: z.number().int()
});
