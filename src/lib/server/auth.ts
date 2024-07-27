// ref: https://github.com/lucia-auth/examples/blob/main/sveltekit/username-and-password/src/lib/server/auth.ts
import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { db } from '$lib/server/db';
import type { IDatabaseUser } from '../../types';

export const adapter = new PrismaAdapter(db.session, db.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			username: attributes.username
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: Omit<IDatabaseUser, 'id' | 'hashedPassword'>;
	}
}
