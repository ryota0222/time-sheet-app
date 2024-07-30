import { render, screen } from '@testing-library/svelte';
import { expect, test } from 'vitest';

import IncomeCalculator from './index.svelte';

test('[workTime: 0, cost: 0, tax: 1]の場合に正しく描画される', () => {
	// すべてのpropsが空の場合
	render(IncomeCalculator, { workTime: 0, cost: 0, tax: 1 });
	expect(screen.getByTestId('work-time').textContent).toContain('');
	expect(screen.getByTestId('cost').textContent).toContain('');
	expect(screen.getByTestId('sum').textContent).toContain('');
});

test('[workTime: 2.34, cost: 0, tax: 1]の場合に正しく描画される', () => {
	// propsでworkTimeのみ渡した場合
	render(IncomeCalculator, { workTime: 2.34, cost: 0, tax: 1 });
	expect(screen.getByTestId('work-time').textContent).toContain('2.34');
	expect(screen.getByTestId('cost').textContent).toContain('');
	expect(screen.getByTestId('sum').textContent).toContain('');
});

test('[workTime: 0, cost: 1000, tax: 1]の場合に正しく描画される', () => {
	// propsでworkTimeのみ渡した場合
	render(IncomeCalculator, { workTime: 0, cost: 1000, tax: 1 });
	expect(screen.getByTestId('work-time').textContent).toContain('');
	expect(screen.getByTestId('cost').textContent).toContain('1000 × 1.1');
	expect(screen.getByTestId('sum').textContent).toContain('');
});

test('[workTime: 0, cost: 1000, tax: 0]の場合に正しく描画される', () => {
	// propsでworkTimeのみ渡した場合
	render(IncomeCalculator, { workTime: 0, cost: 1000, tax: 1 });
	expect(screen.getByTestId('work-time').textContent).toContain('');
	expect(screen.getByTestId('cost').textContent).toContain('1000');
	expect(screen.getByTestId('sum').textContent).toContain('');
});

test('[workTime: 2.34, cost: 1000, tax: 1]の場合に正しく描画される', () => {
	// propsでworkTimeのみ渡した場合
	render(IncomeCalculator, { workTime: 2.34, cost: 1000, tax: 1 });
	expect(screen.getByTestId('work-time').textContent).toContain('2.34');
	expect(screen.getByTestId('cost').textContent).toContain('1000 × 1.1');
	expect(screen.getByTestId('sum').textContent).toContain('2,574');
});
