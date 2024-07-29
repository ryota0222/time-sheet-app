import { expect, test } from '@playwright/test';

test('ログイン画面にh1タイトルが存在する', async ({ page }) => {
	await page.goto('/login');
	await expect(page.locator('h1')).toBeVisible();
});
