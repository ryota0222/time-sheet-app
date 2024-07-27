import { db } from '$lib/server/db';
import { zod, type Infer } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { registerProjectSchema } from '$lib/schemas/registerProjectSchema';
import { message, superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { MessageStatus, type Message } from '../../../types';

const schema = zod(registerProjectSchema);

export const load: PageServerLoad = async ({ locals, depends }) => {
	depends('app:projects');
	const form = await superValidate<Infer<typeof registerProjectSchema>, Message>(
		{
			name: '',
			color: '#000000',
			tax: 1,
			price: 4000
		},
		schema
	);
	const userId = locals.user?.id;
	if (userId) {
		// project一覧を取得
		const result = await db.project.findMany({
			where: {
				userId,
				deletedAt: null
			}
		});

		return { projects: result, form };
	}
	return { projects: [], form };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const form = await superValidate<Infer<typeof registerProjectSchema>, Message>(data, schema);

		if (!form.valid) {
			return fail(400, { form });
		}
		const userId = locals.user?.id;
		if (userId) {
			await db.project.create({
				data: {
					userId,
					name: form.data.name,
					color: form.data.color,
					tax: form.data.tax,
					price: form.data.price
				}
			});
			console.log('create');
			return message(form, {
				text: 'プロジェクトを登録しました',
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
};
