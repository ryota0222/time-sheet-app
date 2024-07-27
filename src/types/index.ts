export interface IProject {
	id: number;
	name: string;
	tax: 1 | 0;
	price: number;
}

export interface IDatabaseUser {
	id: string;
	username: string;
	hashedPassword: string;
}

export enum MessageStatus {
	error = 'error',
	success = 'success'
}

export type Message = {
	status: MessageStatus;
	text: string;
	type?: string;
};
