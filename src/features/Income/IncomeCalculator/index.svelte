<script lang="ts">
	export let workTime: number = 0;
	export let cost: number = 0;
	export let tax: number;

	$: sum = workTime * cost * (tax === 1 ? 1.1 : 1);
</script>

<div class="flex items-end gap-3">
	<div data-testid="work-time" class="flex flex-col gap-1">
		<span class="text-xs">稼働時間</span>
		{#if workTime}
			<span class="px-3 py-2 bg-slate-100 h-10 min-w-16 rounded-lg">{workTime}</span>
		{:else}
			<span class="px-3 py-2 bg-slate-100 h-10 min-w-16 rounded-lg"></span>
		{/if}
	</div>
	<span class="block mb-2">×</span>
	<div data-testid="cost" class="flex flex-col gap-1">
		<span class="text-xs">単価</span>
		{#if cost}
			<span class="px-3 py-2 bg-slate-100 h-10 min-w-16 rounded-lg"
				>{cost}
				{#if tax === 1}
					<span class="inline-block mx-2">×</span>
					<span>1.1</span>
				{/if}
			</span>
		{:else}
			<span class="px-3 py-2 bg-slate-100 h-10 min-w-16 rounded-lg"></span>
		{/if}
	</div>
	<span class="block mb-2">=</span>
	<div data-testid="sum" class="flex flex-col gap-1">
		<spa class="text-xs">金額</spa>
		{#if sum}
			<span class="px-3 py-2 bg-slate-100 h-10 min-w-16 rounded-lg">{sum.toLocaleString()}</span>
		{:else}
			<span class="px-3 py-2 bg-slate-100 h-10 min-w-16 rounded-lg"></span>
		{/if}
	</div>
	<span class="block mb-2">円</span>
</div>
