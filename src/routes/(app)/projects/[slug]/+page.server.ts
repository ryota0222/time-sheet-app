import { message, superValidate, type Infer } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { registerProjectSchema } from '$lib/schemas/registerProjectSchema';
import { MessageStatus, type Message } from '../../../../types';
import { zod } from 'sveltekit-superforms/adapters';
import { db } from '$lib/server/db';
import { fail } from '@sveltejs/kit';
import dayjs from '$lib/dayjs';

const schema = zod(registerProjectSchema);

export const load: PageServerLoad = async ({ locals, depends, params }) => {
	depends(`app:projects-${params.slug}`);
	const userId = locals.user?.id;
	if (userId) {
		// project詳細を取得
		const project = await db.project.findUnique({
			where: {
				userId,
				id: params.slug
			}
		});
		// 今月の稼働を取得
		const works = await db.work.findMany({
			where: {
				userId,
				projectId: params.slug,
				startDateTime: {
					gte: dayjs().startOf('month').toDate(),
					lte: dayjs().endOf('month').toDate()
				},
				deletedAt: null
			}
		});
		const form = await superValidate<Infer<typeof registerProjectSchema>, Message>(
			{
				name: project?.name || '',
				color: project?.color || '#000000',
				tax: project?.tax === 0 ? 0 : 1,
				price: project?.price || 0
			},
			schema
		);
		return { project, form, works };
	}
	const form = await superValidate<Infer<typeof registerProjectSchema>, Message>(schema);
	return { project: null, form, works: [] };
};

export const actions: Actions = {
	update: async ({ request, locals, params }) => {
		const data = await request.formData();
		const form = await superValidate<Infer<typeof registerProjectSchema>, Message>(data, schema);
		if (!form.valid) {
			return fail(400, { form });
		}
		const userId = locals.user?.id;
		if (userId) {
			await db.project.update({
				where: {
					userId,
					id: params.slug
				},
				data: {
					name: form.data.name,
					color: form.data.color,
					tax: form.data.tax,
					price: form.data.price
				}
			});

			return message(form, {
				text: 'プロジェクトを更新しました',
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
					status: 400
				}
			);
		}
	},
	delete: async ({ locals, params }) => {
		const userId = locals.user?.id;
		const form = await superValidate<Infer<typeof registerProjectSchema>, Message>(schema);
		if (userId) {
			await db.project.update({
				where: {
					userId,
					id: params.slug
				},
				data: {
					deletedAt: dayjs().toDate()
				}
			});
			return message(form, {
				text: 'プロジェクトを削除しました',
				status: MessageStatus.success,
				type: 'delete'
			});
		} else {
			return message(form, {
				text: 'ユーザーが存在しません',
				status: MessageStatus.error,
				type: 'delete'
			});
		}
	}
};
