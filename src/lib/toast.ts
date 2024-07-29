import { writable } from 'svelte/store';

const DEFAULT_TIMEOUT = 5;

export const useToast = () => {
	const toastStatus = writable(false);
	const message = writable('');
	let counter = DEFAULT_TIMEOUT;

	function trigger(value: string) {
		toastStatus.set(true);
		counter = DEFAULT_TIMEOUT;
		message.set(value);
		timeout();
	}

	function timeout() {
		if (--counter > 0) return setTimeout(timeout, 1000);
		toastStatus.set(false);
		message.set('');
	}

	return {
		toastStatus,
		trigger,
		message
	};
};
