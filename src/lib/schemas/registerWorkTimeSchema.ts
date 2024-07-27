import dayjs from 'dayjs';
import { z } from 'zod';

export const registerWorkTimeSchema = z
	.object({
		projectId: z.string(),
		startDate: z.date(),
		startTime: z
			.string()
			.regex(/^\d{2}:\d{2}$/, { message: 'Invalid time format. Expected HH:MM' }),
		endDate: z.date(),
		endTime: z.string().regex(/^\d{2}:\d{2}$/, { message: 'Invalid time format. Expected HH:MM' })
	})
	.refine(
		(data) => {
			return (
				dayjs(`${dayjs(data.startDate).format('YYYY-MM-DD')} ${data.startTime}`) <=
				dayjs(`${`${dayjs(data.endDate).format('YYYY-MM-DD')}`} ${data.endTime}`)
			);
		},
		{
			message: '開始時間が終了時間よりも後になっています',
			path: ['startTime']
		}
	);
