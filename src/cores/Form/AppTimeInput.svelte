<script lang="ts">
	import { Label } from 'flowbite-svelte';
	import clock from '$lib/images/clock.svg';

	export let placeholder: string | undefined;
	export let value: string;
	export let required: boolean | undefined = false;
	export let disabled: boolean | undefined = false;
	export let id: string;
	export let name: string;
	export let label: string;
</script>

<Label>
	{label}
	<div class="mt-2 relative max-w-[120px]">
		<div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
			<img src={clock} alt="clock" />
		</div>
		<input
			type="time"
			{id}
			{name}
			{placeholder}
			class="bg-white border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			bind:value
			{disabled}
			{required}
		/>
	</div>
</Label>
