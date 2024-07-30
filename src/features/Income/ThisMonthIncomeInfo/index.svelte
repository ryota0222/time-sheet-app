<script lang="ts">
	import clock from '$lib/images/clock.svg';
	import coins from '$lib/images/coins.svg';

	export let totalIncome: number;
	export let projects: { id: string; name: string; color: string }[];
	export let monthlyIncomePerProject: { id: string; time: number; income: number }[];

	const getProject = (id: string) => {
		return projects.find((project) => project.id === id);
	};
</script>

<div class="bg-slate-50 p-8 rounded-2xl">
	<span class="text-3xl font-bold block mb-4" data-testid="total-income"
		>{totalIncome.toLocaleString()}<span class="text-base inline-block ml-1">円</span></span
	>
	<div class="flex justify-between">
		{#each monthlyIncomePerProject as project (project.id)}
			<div
				data-testid={`project-${project.id}`}
				style={`width: ${100 / monthlyIncomePerProject.length}%`}
			>
				<div class="flex items-center gap-2 mb-1 text-sm">
					<div
						class="w-[12px] h-[12px] rounded-[4px]"
						style={`background-color: ${getProject(project.id)?.color}`}
					/>
					<span>{getProject(project.id)?.name}</span>
				</div>
				<div class="flex items-center gap-2 mb-1 text-sm">
					<img src={clock} alt="clock" />
					<span>{project.time}時間</span>
				</div>
				<div class="flex items-center gap-2 mb-1 text-sm">
					<img src={coins} alt="coins" />
					<span>{project.income.toLocaleString()}円</span>
				</div>
			</div>
		{/each}
	</div>
</div>
