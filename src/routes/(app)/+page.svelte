<script lang="ts">
	import { Button, Toast } from 'flowbite-svelte';
	import ThisMonthIncomeInfo from '../../features/Income/ThisMonthIncomeInfo/index.svelte';
	import IncomeCalculator from '../../features/Income/IncomeCalculator/index.svelte';
	import AppSelect from '../../cores/Form/AppSelect.svelte';
	import AppDateInput from '../../cores/Form/AppDateInput.svelte';
	import AppTimeInput from '../../cores/Form/AppTimeInput.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import Title from '../../cores/Title/index.svelte';
	import { slide } from 'svelte/transition';
	import { useToast } from '$lib/toast';
	import dayjs from '$lib/dayjs';
	import { goto, invalidate } from '$app/navigation';
	import type { Dayjs } from 'dayjs';

	export let data;

	let targetMonth = dayjs().startOf('month');

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

	const getProject = (id: string) => {
		return data.projects.find((project) => project.id === id);
	};

	const getWorkTime = ({
		startDate,
		startTime,
		endDate,
		endTime
	}: {
		startDate?: Date;
		startTime?: string;
		endDate?: Date;
		endTime?: string;
	}) => {
		if (!startDate || !startTime || !endDate || !endTime) {
			return 0;
		}
		const start = dayjs(`${startDate} ${startTime}`);
		const end = dayjs(`${endDate} ${endTime}`);
		if (end.isBefore(start)) {
			return 0;
		}
		// 少数第2位まで表示
		return Math.round((end.diff(start, 'minute') / 60) * 100) / 100;
	};

	const updateTargetMonth = (newMonth: Dayjs) => {
		targetMonth = newMonth;
		const monthString = targetMonth.format('YYYY-MM'); // クエリパラメータ用にフォーマット
		goto(`/?tm=${monthString}`, { replaceState: true }); // ページをリロードせずクエリを更新
	};

	// ボタンなどで targetMonth を更新する例
	function goToPreviousMonth() {
		updateTargetMonth(targetMonth.subtract(1, 'month'));
	}

	function goToNextMonth() {
		updateTargetMonth(targetMonth.add(1, 'month'));
	}
</script>

<svelte:head>
	<title>Home | Time Sheet</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="mt-10">
	<div class="flex items-center gap-4 mb-4">
		<Title tag="h2" titleClass="mb-0"
			>{targetMonth.isSame(dayjs(), 'month')
				? '今月'
				: `${targetMonth.format('YYYY年M月')}`}の収入</Title
		>
		<Button pill={true} class="p-1.5" outline color="dark" size="sm" on:click={goToPreviousMonth}>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M16.1705 4.4545C16.6098 4.89384 16.6098 5.60616 16.1705 6.0455L10.216 12L16.1705 17.9545C16.6098 18.3938 16.6098 19.1062 16.1705 19.5455C15.7312 19.9848 15.0188 19.9848 14.5795 19.5455L7.8295 12.7955C7.39017 12.3562 7.39017 11.6438 7.8295 11.2045L14.5795 4.4545C15.0188 4.01517 15.7312 4.01517 16.1705 4.4545Z"
					fill="currentColor"
				/>
			</svg>
		</Button>
		<Button
			disabled={targetMonth.isSame(dayjs(), 'month')}
			pill={true}
			class="p-1.5"
			outline
			color="dark"
			size="sm"
			on:click={goToNextMonth}
		>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="rotate-180"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M16.1705 4.4545C16.6098 4.89384 16.6098 5.60616 16.1705 6.0455L10.216 12L16.1705 17.9545C16.6098 18.3938 16.6098 19.1062 16.1705 19.5455C15.7312 19.9848 15.0188 19.9848 14.5795 19.5455L7.8295 12.7955C7.39017 12.3562 7.39017 11.6438 7.8295 11.2045L14.5795 4.4545C15.0188 4.01517 15.7312 4.01517 16.1705 4.4545Z"
					fill="currentColor"
				/>
			</svg>
		</Button>
	</div>
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
			<div class="mt-8 flex justify-between items-end">
				<IncomeCalculator
					tax={getProject($form.projectId)?.tax || 0}
					cost={getProject($form.projectId)?.price}
					workTime={getWorkTime({
						startDate: $form.startDate,
						startTime: $form.startTime,
						endDate: $form.endDate,
						endTime: $form.endTime
					})}
				/>
				<div>
					<Button disabled={$submitting} type="submit" color="dark">登録</Button>
				</div>
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
