<script lang="ts">
	import { Button, Input, Label, Modal, NumberInput, Radio, Toast } from 'flowbite-svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import ColorPicker from 'svelte-awesome-color-picker';
	import { invalidate } from '$app/navigation';
	import Title from '../../../cores/Title/index.svelte';
	import AppTextInput from '../../../cores/Form/AppTextInput.svelte';
	import ProjectListItem from '../../../features/Project/ProjectListItem/index.svelte';

	export let data;
	const { form, enhance, submitting } = superForm(data.form, {
		taintedMessage: false,
		onUpdated({ form }) {
			if (form.message?.status === 'success') {
				{
					(async () => {
						invalidate('app:projects');
						opened = false;
					})();
				}
			}
		}
	});

	let opened = false;
</script>

<svelte:head>
	<title>Projects | Time Sheet</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="mt-10">
	<div class="flex justify-between items-center">
		<Title tag="h2">Projects</Title>
		<Button color="dark" on:click={() => (opened = true)} class="w-24 h-12">追加</Button>
	</div>

	{#if !!data.projects?.length}
		<ul>
			{#each data.projects as project (project.id)}
				<li class="my-4">
					<ProjectListItem {...project} />
				</li>
			{/each}
		</ul>
	{:else}
		<div class="p-8 bg-slate-50 mt-6">
			<p>プロジェクトがありません。</p>
		</div>
	{/if}
</section>

<Modal title="プロジェクトの追加" bind:open={opened} outsideclose>
	<form class="flex flex-col space-y-6" method="POST" use:enhance>
		<AppTextInput
			id="name"
			name="name"
			placeholder=""
			required
			bind:value={$form.name}
			disabled={$submitting}
			label="名前"
			inputClass="w-full"
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
				<ColorPicker bind:hex={$form.color} name="color" label="色を選択してください" />
			</div>
		</Label>
		<Label>
			税込
			<ul class="flex">
				<li class="w-1/2">
					<Radio class="p-3" name="tax" bind:group={$form.tax} value={1}>あり</Radio>
				</li>
				<li class="w-1/2">
					<Radio class="p-3" name="tax" bind:group={$form.tax} value={0}>なし</Radio>
				</li>
			</ul>
		</Label>
		<Button type="submit" disabled={$submitting} class="w-full1" color="dark">登録</Button>
	</form>
</Modal>
