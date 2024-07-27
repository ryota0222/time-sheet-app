<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button } from 'flowbite-svelte';
	import Title from '../cores/Title/index.svelte';
</script>

<section class="container mx-auto h-screen flex flex-col justify-center items-center">
	{#if $page.error?.message}
		<Title>{$page.status}</Title>
		<p class="mb-8">{$page.error.message}</p>
	{:else}
		<Title>{$page.status}</Title>
		<p class="mb-8">予期せぬエラーが発生しました</p>
	{/if}
	<Button color="dark" on:click={() => goto('/')} class="min-w-32">トップに戻る</Button>
</section>
