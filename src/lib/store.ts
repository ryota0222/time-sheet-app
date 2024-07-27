import { writable } from 'svelte/store';
import type { IProject } from '../types';

const Projects: IProject[] = [
	{
		id: 0,
		name: 'ProjectA',
		tax: 1,
		price: 3500
	},
	{
		id: 1,
		name: 'ProjectB',
		tax: 1,
		price: 4000
	},
	{
		id: 2,
		name: 'ProjectC',
		tax: 0,
		price: 5000
	}
];

export const projects = writable<IProject[]>(Projects);
