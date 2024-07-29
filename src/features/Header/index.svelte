<script lang="ts">
	import logo from '$lib/images/logo.svg';
	import { Button } from 'flowbite-svelte';
	import NavItem from './components/NavItem.svelte';

	export let username: string | undefined = '';
	export let pathname: string;
</script>

<header class="px-6 flex items-center justify-between h-16">
	<div class="flex items-center gap-8">
		<a href="/" class="text-black no-underline">
			<div class="flex items-center gap-2">
				<img src={logo} alt="SvelteKit" />
				<span class="text-black">Time Sheet</span>
			</div>
		</a>

		{#if pathname !== '/login'}
			<nav class="flex gap-4" data-testid="nav-list">
				<ul class="flex">
					<NavItem pathname="/" name="Home" currentPathname={pathname} />
					<NavItem pathname="/projects" name="Projects" currentPathname={pathname} />
					<NavItem pathname="/calendar" name="Calendar" currentPathname={pathname} />
				</ul>
			</nav>
		{/if}
	</div>
	{#if username}
		<!-- <div class="flex items-center gap-3 py-2 px-3">
			<Avatar size="sm" />
			<span>{username}</span>
		</div> -->
		<div class="flex items-center gap-4">
			<span>{username}</span>
			<Button href="/logout" type="submit" color="red">ログアウト</Button>
		</div>
	{/if}
</header>

<style>
</style>
