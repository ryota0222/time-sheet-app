import { lucia } from '$lib/server/auth.js';
import { fail, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ cookies, locals }) => {
	if (!locals.session) {
		throw fail(401);
	} else {
		await lucia.invalidateSession(locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
		throw redirect(302, '/login');
	}
}) satisfies RequestHandler;
