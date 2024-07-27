<script lang="ts">
	import logo from '$lib/images/logo.svg';
	import { Button } from 'flowbite-svelte';
	import NavItem from './components/NavItem.svelte';
	import { page } from '$app/stores';

	export let username: string | undefined = '';
</script>

<header class="px-6 flex items-center justify-between h-16">
	<div class="flex items-center gap-8">
		<a href="/" class="text-black no-underline">
			<div class="flex items-center gap-2">
				<img src={logo} alt="SvelteKit" />
				<span class="text-black">Time Sheet</span>
			</div>
		</a>

		{#if $page.url.pathname !== '/login'}
			<nav class="flex gap-4">
				<ul class="flex">
					<NavItem path="/" name="Home" />
					<NavItem path="/projects" name="Projects" />
					<NavItem path="/calendar" name="Calendar" />
				</ul>
			</nav>
		{/if}
	</div>
	{#if username}
		<!-- <div class="flex items-center gap-3 py-2 px-3">
			<Avatar size="sm" />
			<span>{username}</span>
		</div> -->
		<Button href="/logout" type="submit" color="red">ログアウト</Button>
	{/if}
</header>

<style>
</style>
