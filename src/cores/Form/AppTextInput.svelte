<script lang="ts">
	import { Input, Label } from 'flowbite-svelte';

	export let placeholder: string | undefined;
	export let value: string | number;
	export let required: boolean | undefined = false;
	export let disabled: boolean | undefined = false;
	export let id: string;
	export let name: string;
	export let label: string;
	export let type: 'text' | 'number' | 'password' = 'text';
	export let right: string = '';
	export let inputClass: string = '';
	export let inputContainerClass: string = 'w-fit';
</script>

<Label>
	{label}
	<div class={`mt-2 relative ${inputContainerClass}`}>
		<Input
			{type}
			{name}
			{id}
			bind:value
			{required}
			{placeholder}
			{disabled}
			class={`bg-white ${inputClass}`}
		>
			<div slot="right">{right}</div>
		</Input>
	</div>
</Label>
