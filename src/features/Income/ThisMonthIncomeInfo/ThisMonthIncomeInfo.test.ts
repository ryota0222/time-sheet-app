import { render, screen } from '@testing-library/svelte';
import { expect, test } from 'vitest';

import ThisMonthIncomeInfo from './index.svelte';

test('収入がない場合の描画が正しくされる', () => {
	render(ThisMonthIncomeInfo, {
		totalIncome: 0,
		projects: [],
		monthlyIncomePerProject: []
	});
	const totalIncome = screen.getByTestId('total-income');
	expect(totalIncome.textContent).toContain('0円');
});

test('収入がある場合の描画が正しくされる', () => {
	render(ThisMonthIncomeInfo, {
		totalIncome: 2000,
		projects: [
			{
				id: '1',
				name: 'project1',
				color: '#000000'
			},
			{
				id: '2',
				name: 'project2',
				color: '#FF0000'
			}
		],
		monthlyIncomePerProject: [
			{
				id: '1',
				income: 1500,
				time: 6.17
			},
			{
				id: '2',
				income: 500,
				time: 4
			}
		]
	});
	const totalIncome = screen.getByTestId('total-income');
	expect(totalIncome.textContent).toContain('2,000円');
	// project1
	const project1 = screen.getByTestId('project-1');
	expect(project1.textContent).toContain('project1');
	expect(project1.textContent).toContain('6.17時間');
	expect(project1.textContent).toContain('1,500円');
	// project1
	const project2 = screen.getByTestId('project-2');
	expect(project2.textContent).toContain('project2');
	expect(project2.textContent).toContain('4時間');
	expect(project2.textContent).toContain('500円');
});
