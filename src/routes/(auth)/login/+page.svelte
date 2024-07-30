<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { Button } from 'flowbite-svelte';
	import Title from '../../../cores/Title/index.svelte';
	import AppTextInput from '../../../cores/Form/AppTextInput.svelte';

	export let data;
	const { form, errors, message, submitting, enhance } = superForm(data.form, {
		taintedMessage: false
	});
</script>

<svelte:head>
	<title></title>
	<meta content="Login | Time Sheet" property="og:title" />
</svelte:head>

<section class="container m-auto max-w-96">
	<Title>Login</Title>

	{#if $message}
		<span class="text-red-500 mt-1 mb-4 block" role="alert" aria-live="assertive"
			>{$message.text}</span
		>
	{/if}

	<form method="POST" use:enhance>
		<div class="mt-4">
			<AppTextInput
				id="username"
				name="username"
				placeholder="username"
				inputContainerClass="w-auto"
				label="ユーザー名"
				bind:value={$form.username}
				disabled={$submitting}
				required
			/>
			{#if $errors.username}
				<span class="text-red-500 mt-1 mb-4 block" aria-live="polite">{$errors.username?.[0]}</span>
			{/if}
		</div>

		<div class="mt-4">
			<AppTextInput
				id="password"
				name="password"
				placeholder="password"
				type="password"
				inputContainerClass="w-auto"
				label="パスワード"
				bind:value={$form.password}
				disabled={$submitting}
				required
			/>
			{#if $errors.username}
				<span class="text-red-500 mt-1 mb-4 block" aria-live="polite">{$errors.password?.[0]}</span>
			{/if}
		</div>

		<div class="flex justify-end mt-8">
			<Button disabled={$submitting} class="w-24" color="dark" type="submit">送信</Button>
		</div>
	</form>
</section>
