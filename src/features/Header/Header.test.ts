import { render, screen } from '@testing-library/svelte';
import { expect, test } from 'vitest';

import Header from './index.svelte';

test('未ログイン時はナビゲーションを描画しない', () => {
	render(Header, { username: '', pathname: '/login' });
	const navList = screen.queryByTestId('nav-list');
	expect(navList).toBeNull();
});

test('未ログイン時はログアウトボタンを描画しない', () => {
	render(Header, { username: '', pathname: '/login' });
	const logoutButton = screen.queryByText('ログアウト');
	expect(logoutButton).toBeNull();
});

test('ログイン時はナビゲーションを描画する', () => {
	render(Header, { username: 'John Doe', pathname: '/' });
	const navList = screen.getByTestId('nav-list');
	expect(navList).toBeDefined();
});

test('ログイン時はログアウトボタンを描画する', async () => {
	render(Header, { username: 'John Doe', pathname: '/' });
	const logoutButton = screen.getByText('ログアウト');
	expect(logoutButton).toBeDefined();
});
