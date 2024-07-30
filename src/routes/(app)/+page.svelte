<script lang="ts">
	import { Button, Toast } from 'flowbite-svelte';
	import ThisMonthIncomeInfo from '../../features/Income/ThisMonthIncomeInfo/index.svelte';
	import AppSelect from '../../cores/Form/AppSelect.svelte';
	import AppDateInput from '../../cores/Form/AppDateInput.svelte';
	import AppTimeInput from '../../cores/Form/AppTimeInput.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import Title from '../../cores/Title/index.svelte';
	import { slide } from 'svelte/transition';
	import { useToast } from '$lib/toast';

	export let data;

	const { trigger, toastStatus, message } = useToast();

	const { form, errors, submitting, enhance } = superForm(data.form, {
		taintedMessage: false,
		onUpdated: ({ form }) => {
			if (form.message) {
				if (form.message.status === 'success') {
					trigger(form.message.text);
				}
			}
		},
		onChange: (event) => {
			const startDate = event.get('startDate');
			if (startDate) {
				event.set('endDate', startDate);
			}
		}
	});

	$: formItemsOfProjects = data.projects.map((project) => ({
		value: project.id,
		name: project.name
	}));

	$: if ($form.startDate) {
		$form.endDate = $form.startDate;
	}
</script>

<svelte:head>
	<title>Home | Time Sheet</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="mt-10">
	<Title tag="h2">今月の収入</Title>
	<ThisMonthIncomeInfo
		totalIncome={data.monthly_income.total_income}
		projects={data.projects}
		monthlyIncomePerProject={data.monthly_income.projects}
	/>
</section>
<section class="mt-16">
	<Title tag="h2">簡単入力</Title>
	<div class="bg-slate-50 p-8 rounded-2xl">
		<form method="POST" use:enhance>
			<div class="mb-6">
				<AppSelect
					id="projectId"
					name="projectId"
					placeholder="案件を選択してください"
					required
					items={formItemsOfProjects}
					bind:value={$form.projectId}
					disabled={$submitting}
					label="案件"
				></AppSelect>
				{#if $errors.projectId}
					<p class="text-red-500 text-sm mt-1">{$errors.projectId}</p>
				{/if}
			</div>
			<div class="flex gap-4 items-end">
				<div class="flex gap-2">
					<AppDateInput
						id="startDate"
						name="startDate"
						placeholder="YYYY/M/D"
						required
						bind:value={$form.startDate}
						disabled={$submitting}
						label="稼働時間"
					/>
					<div class="mt-5">
						<AppTimeInput
							id="startTime"
							name="startTime"
							placeholder="HH:mm"
							required
							bind:value={$form.startTime}
							disabled={$submitting}
							label=""
						/>
						{#if $errors.startTime}
							<p class="text-red-500 text-sm mt-1">{$errors.startTime}</p>
						{/if}
					</div>
				</div>
				<span class="inline-block mb-2">〜</span>
				<div class="flex gap-2 mt-5">
					<AppDateInput
						id="endDate"
						name="endDate"
						placeholder="YYYY/M/D"
						required
						bind:value={$form.endDate}
						disabled={$submitting}
						label=""
					/>
					<div>
						<AppTimeInput
							id="endTime"
							name="endTime"
							placeholder="HH:mm"
							required
							bind:value={$form.endTime}
							disabled={$submitting}
							label=""
						/>
						{#if $errors.endTime}
							<p class="text-red-500 text-sm mt-1">{$errors.endTime}</p>
						{/if}
					</div>
				</div>
			</div>
			<div class="mt-4 flex justify-end">
				<Button disabled={$submitting} type="submit" color="dark">登録</Button>
			</div>
		</form>
	</div>
</section>

<Toast
	dismissable={true}
	position="top-right"
	transition={slide}
	bind:toastStatus={$toastStatus}
	divClass="rounded-[8px] border border-gray-200 bg-white p-4 min-w-[300px] shadow-sm"
>
	{$message}
</Toast>
