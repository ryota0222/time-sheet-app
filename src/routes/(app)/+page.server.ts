import { fail, type Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { registerWorkTimeSchema } from '$lib/schemas/registerWorkTimeSchema';
import { zod, type Infer } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { MessageStatus, type Message } from '../../types';
import { db } from '$lib/server/db';
import dayjs from '$lib/dayjs';

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
// export const prerender = true;

const schema = zod(registerWorkTimeSchema);

export const load: PageServerLoad = async ({ locals }) => {
	const form = await superValidate<Infer<typeof registerWorkTimeSchema>, Message>(
		{
			projectId: '',
			startTime: '00:00',
			endTime: '00:00'
		},
		schema
	);
	const userId = locals.user?.id;
	let monthly_income_projects: {
		id: string;
		income: number;
		time: number;
	}[] = [];
	if (userId) {
		// project一覧を取得
		const result = await db.project.findMany({
			where: {
				userId,
				deletedAt: null
			}
		});

		// 今月のworkを全て取得
		const now = dayjs();
		const startOfMonth = now.startOf('month').toDate();
		const endOfMonth = now.endOf('month').toDate();
		const works = await db.work.findMany({
			where: {
				userId,
				startDateTime: {
					gte: startOfMonth,
					lte: endOfMonth
				}
			}
		});

		console.log(works);

		for (const work of works) {
			const project = result.find((project) => project.id === work.projectId);
			if (project) {
				// 分に換算
				const workMinutes = (work.endDateTime.getTime() - work.startDateTime.getTime()) / 1000 / 60;
				// 小数点第2位まで表示
				const workHours = Math.round((workMinutes / 60) * 100) / 100;
				const income = project.price * workHours * (project.tax ? 1.1 : 1);
				const projectIndex = monthly_income_projects.findIndex((p) => p.id === project.id);
				if (projectIndex === -1) {
					monthly_income_projects = [
						...monthly_income_projects,
						{
							id: project.id,
							income,
							time: workMinutes
						}
					];
				} else {
					monthly_income_projects[projectIndex].income += income;
					monthly_income_projects[projectIndex].time += workMinutes;
				}
			}
		}

		return {
			monthly_income: {
				total_income: monthly_income_projects.reduce((acc, project) => acc + project.income, 0),
				projects: monthly_income_projects.map((project) => {
					const income = Math.round(project.income);
					// 分から時に変換。小数第
					const hours = Math.round((project.time / 60) * 100) / 100;
					return {
						...project,
						income,
						time: hours
					};
				})
			},
			projects: result,
			form
		};
	}
	return {
		monthly_income: {
			total_income: 0,
			projects: monthly_income_projects
		},
		projects: [],
		form
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const form = await superValidate<Infer<typeof registerWorkTimeSchema>, Message>(data, schema);
		if (!form.valid) {
			return fail(400, { form });
		}
		const startDateTime = dayjs(form.data.startDate).toDate();
		const [startHours, startMinutes] = form.data.startTime.split(':').map(Number);
		startDateTime.setUTCHours(startHours);
		startDateTime.setUTCMinutes(startMinutes);
		const endDateTime = dayjs(form.data.endDate).toDate();
		const [endHours, endMinutes] = form.data.endTime.split(':').map(Number);
		endDateTime.setUTCHours(endHours);
		endDateTime.setUTCMinutes(endMinutes);

		const userId = locals.user?.id;
		if (userId) {
			await db.work.create({
				data: {
					userId,
					projectId: form.data.projectId,
					startDateTime: startDateTime,
					endDateTime: endDateTime
				}
			});
			return message(form, {
				text: '稼働時間を登録しました',
				status: MessageStatus.success
			});
		} else {
			return message(
				form,
				{
					text: 'ユーザーが存在しません',
					status: MessageStatus.error
				},
				{
					status: 401
				}
			);
		}
	}
} satisfies Actions;
