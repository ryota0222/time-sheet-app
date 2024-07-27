<script lang="ts">
	import { Label } from 'flowbite-svelte';
	import calendar from '$lib/images/calendar.svg';

	export let placeholder: string | undefined;
	export let value: Date;
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
			<img src={calendar} alt="clock" width={16} height={16} />
		</div>
		<input
			datepicker
			type="text"
			class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			{placeholder}
			{id}
			bind:value
			{disabled}
			{name}
			{required}
			datepicker-format="yyyy/m/d"
		/>
	</div>
</Label>
