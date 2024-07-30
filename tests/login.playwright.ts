import { expect, test } from '@playwright/test';

test('ログイン画面にh1タイトルが存在する', async ({ page }) => {
	await page.goto('/login');
	await expect(page.locator('h1')).toHaveText('Login');
});

test('間違えたユーザーでログインボタンをクリックする', async ({ page }) => {
	await page.goto('/login');

	await page.getByLabel('ユーザー名').fill('username');
	await page.getByLabel('パスワード').fill('password');

	await page.click('button[type=submit]');

	// エラーメッセージが表示される
	await expect(page.getByRole('alert')).toHaveText('ユーザー名またはパスワードが間違っています');
});

// test('正しいユーザーでログインボタンをクリックする', async ({ page }) => {
// 	await page.goto('/login');

// await page.getByLabel('ユーザー名').fill('test');
// await page.getByLabel('パスワード').fill('test');

// await page.click('button[type=submit]');

// await expect(page.locator('h2')).toHaveText('今月の収入');
// });
