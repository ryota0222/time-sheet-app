<script lang="ts">
	import { Label, Select } from 'flowbite-svelte';

	export let items: { value: string; name: string }[] = [];
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
	<Select
		class="mt-2 bg-white"
		{id}
		{name}
		{placeholder}
		{required}
		{items}
		bind:value
		{disabled}
	/>
</Label>
