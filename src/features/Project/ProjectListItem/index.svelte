<script lang="ts">
	import clock from '$lib/images/clock.svg';
	import coins from '$lib/images/coins.svg';
	import Title from '../../../cores/Title/index.svelte';

	export let id: string;
	export let name: string;
	export let color: string;
	export let price: number;
	export let tax: number;
</script>

<a href={`/projects/${id}`} data-sveltekit-preload-data>
	<section class="p-6 rounded-md bg-slate-50 border border-slate-50 hover:border-slate-300">
		<div class="flex items-center gap-4">
			<span
				role="presentation"
				class="w-6 h-6 rounded-md inline-block"
				style={`background-color: ${color}`}
			/>
			<Title tag="h3" titleClass="mb-0">{name}</Title>
		</div>
		<div class="flex items-center gap-2 mb-1 text-sm mt-8">
			<img src={clock} alt="clock" />
			<span class="inline-block w-12">単価</span>
			<span data-testid="price">{price.toLocaleString()}円</span>
		</div>
		<div class="flex items-center gap-2 mb-1 text-sm mt-2">
			<img src={coins} alt="coins" />
			<span class="inline-block w-12">税込</span>
			<span data-testid="tax">{tax ? 'あり' : 'なし'}</span>
		</div>
	</section>
</a>
