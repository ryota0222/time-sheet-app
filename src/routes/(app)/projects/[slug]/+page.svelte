<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import {
		Button,
		Label,
		Radio,
		Toast,
		Table,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyCell,
		TableBodyRow
	} from 'flowbite-svelte';
	import ColorPicker from 'svelte-awesome-color-picker';
	import { superForm } from 'sveltekit-superforms/client';
	import { MessageStatus } from '../../../../types/index.js';
	import Title from '../../../../cores/Title/index.svelte';
	import AppTextInput from '../../../../cores/Form/AppTextInput.svelte';
	import { slide } from 'svelte/transition';
	import { useToast } from '$lib/toast.js';
	import dayjs from '$lib/dayjs';

	export let data;

	const { trigger, toastStatus, message } = useToast();

	const { form, enhance, submitting } = superForm(data.form, {
		taintedMessage: false,
		onUpdated(props) {
			const { form } = props;
			if (form.message?.status === MessageStatus.success) {
				{
					(async () => {
						await invalidate('app:projects');
						if (form.message?.text) {
							trigger(form.message.text);
						}
						await goto('/projects');
					})();
				}
			}
		}
	});
</script>

<svelte:head>
	<title>{$page.data.project.name} | Time Sheet</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="mt-10">
	<div class="flex justify-between items-end mb-8">
		<div>
			<div class="flex gap-2 items-center mb-4">
				<a href="/projects">
					<span
						class="text-gray-500 decoration-gray-300 text-xs underline underline-offset-4 hover:decoration-gray-400"
						>プロジェクト一覧</span
					>
				</a>
				<span class="text-gray-500 text-xs"> / </span>
				<span class="text-gray-500 text-xs">{data?.project?.name}</span>
			</div>
			<Title tag="h2" titleClass="mb-0">{data?.project?.name}</Title>
		</div>
		<form method="POST" action="?/delete" use:enhance>
			<Button color="red" type="submit">削除</Button>
		</form>
	</div>

	<form
		class="flex flex-col space-y-6 p-6 bg-slate-50 rounded-lg"
		method="POST"
		action="?/update"
		use:enhance
	>
		<AppTextInput
			id="name"
			name="name"
			placeholder=""
			required
			bind:value={$form.name}
			disabled={$submitting}
			label="名前"
			inputClass="w-full"
			inputContainerClass="w-full"
		/>
		<AppTextInput
			id="number"
			name="price"
			placeholder=""
			required
			bind:value={$form.price}
			disabled={$submitting}
			label="単価"
			type="number"
			right="円"
			inputClass="w-[160px]"
		/>
		<Label>
			カラー
			<div class="mt-2">
				<ColorPicker bind:hex={$form.color} label="色を選択してください" name="color" />
			</div>
		</Label>
		<Label>
			税込
			<ul class="flex">
				<li class="w-1/2">
					<Radio name="tax" class="p-3" bind:group={$form.tax} value={1}>あり</Radio>
				</li>
				<li class="w-1/2">
					<Radio name="tax" class="p-3" bind:group={$form.tax} value={0}>なし</Radio>
				</li>
			</ul>
		</Label>
		<div class="flex justify-end">
			<Button type="submit" disabled={$submitting} color="dark" class="w-24">更新</Button>
		</div>
	</form>
	<div class="mt-16">
		<Title tag="h3">今月の稼働一覧</Title>
		{#if data?.works?.length}
			<div class="border border-slate-200 rounded-lg overflow-hidden">
				<Table striped={true}>
					<TableHead>
						<TableHeadCell>開始日時</TableHeadCell>
						<TableHeadCell>終了日時</TableHeadCell>
						<TableHeadCell>登録日</TableHeadCell>
					</TableHead>
					<TableBody tableBodyClass="divide-y">
						{#each data.works as work (work.id)}
							<TableBodyRow>
								<TableBodyCell>{dayjs(work.startDateTime).utc().format('M/D HH:mm')}</TableBodyCell>
								<TableBodyCell>{dayjs(work.endDateTime).utc().format('M/D HH:mm')}</TableBodyCell>
								<TableBodyCell>
									{dayjs(work.createdAt).format('M/D HH:mm')}
								</TableBodyCell>
							</TableBodyRow>
						{/each}
					</TableBody>
				</Table>
			</div>
		{:else}
			<p>今月の稼働はありません</p>
		{/if}
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
