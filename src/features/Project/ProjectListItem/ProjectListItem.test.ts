import { render, screen } from '@testing-library/svelte';
import { expect, test } from 'vitest';

import ProjectListItem from './index.svelte';

test('プロジェクト名が描画される', () => {
	render(ProjectListItem, {
		id: '1',
		name: 'project1',
		color: '#000000',
		tax: 1,
		price: 1000
	});
	expect(screen.getByRole('heading', { level: 3 }).textContent).toContain('project1');
	expect(screen.getByTestId('price').textContent).toContain('1,000円');
	expect(screen.getByTestId('tax').textContent).toContain('あり');
});
