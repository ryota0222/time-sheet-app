import { zod, type Infer } from 'sveltekit-superforms/adapters';
import { loginSchema } from '$lib/schemas/loginSchema';
import { superValidate, message } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import { verify } from '@node-rs/argon2';
import { MessageStatus, type IDatabaseUser, type Message } from '../../../types';
import { lucia } from '$lib/server/auth';
import { db } from '$lib/server/db';
import type { PageLoad } from '../../(app)/$types';

const schema = zod(loginSchema);

export const load: PageLoad = async () => {
	const form = await superValidate<Infer<typeof loginSchema>, Message>(schema);
	return { form };
};

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const form = await superValidate<Infer<typeof loginSchema>, Message>(data, schema);
		if (!form.valid) {
			return fail(400, { form });
		}
		const username = form.data.username;
		const password = form.data.password;
		// ユーザー名を元にユーザーを取得
		const user = (await db.user.findUnique({
			where: { username }
		})) as IDatabaseUser;
		// ユーザーが存在しない場合はエラー
		if (!user) {
			/**
			 * ===================================
			 */
			// const hashedPassword = await hash(password, {
			// 	memoryCost: 19456,
			// 	timeCost: 2,
			// 	outputLen: 32,
			// 	parallelism: 1
			// });
			// await db.user.create({
			// 	data: {
			// 		id: crypto.randomUUID(),
			// 		username: username,
			// 		hashedPassword: hashedPassword
			// 	}
			// });
			/**
			 * ===================================
			 */
			return message(form, {
				status: MessageStatus.error,
				text: 'ユーザー名またはパスワードが間違っています'
			});
		}
		// ハッシュ化したパスワードが一致しない場合はエラー
		const validPassword = await verify(user.hashedPassword, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		if (!validPassword) {
			return message(form, {
				status: MessageStatus.error,
				text: 'ユーザー名またはパスワードが間違っています'
			});
		}
		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		return redirect(302, '/');
	}
};
