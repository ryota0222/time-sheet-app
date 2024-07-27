import { message, superValidate, type Infer } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { registerProjectSchema } from '$lib/schemas/registerProjectSchema';
import { MessageStatus, type Message } from '../../../../types';
import { zod } from 'sveltekit-superforms/adapters';
import { db } from '$lib/server/db';
import { fail } from '@sveltejs/kit';

const schema = zod(registerProjectSchema);

export const load: PageServerLoad = async ({ locals, depends, params }) => {
	depends(`app:projects-${params.slug}`);
	const userId = locals.user?.id;
	if (userId) {
		// project詳細を取得
		const result = await db.project.findUnique({
			where: {
				userId,
				id: params.slug
			}
		});
		const form = await superValidate<Infer<typeof registerProjectSchema>, Message>(
			{
				name: result?.name || '',
				color: result?.color || '#000000',
				tax: result?.tax === 0 ? 0 : 1,
				price: result?.price || 0
			},
			schema
		);
		return { project: result, form };
	}
	const form = await superValidate<Infer<typeof registerProjectSchema>, Message>(schema);
	return { project: null, form };
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
					deletedAt: new Date()
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
