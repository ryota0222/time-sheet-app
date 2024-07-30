import { type PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build:test && npm run preview',
		port: 4173
	},
	testDir: 'tests',
	retries: process.env.CI ? 2 : 0,
	forbidOnly: !!process.env.CI,
	workers: process.env.CI ? 1 : undefined,
	fullyParallel: true,
	testMatch: /(.+\.)(playwright)\.[jt]s/,
	reporter: 'html',
	use: {
		trace: 'on-first-retry',
		video: 'retain-on-failure'
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		}
	]
};

export default config;
