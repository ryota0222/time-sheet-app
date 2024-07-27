<script lang="ts">
	import Header from '../../features/Header/index.svelte';
	import { Footer, FooterCopyright } from 'flowbite-svelte';
</script>

<Header />

<main class="container mx-auto">
	<slot />
</main>

<Footer>
	<div class="flex justify-center py-6 bg-slate-50">
		<FooterCopyright href="/" by="Ryotanny" year={2024} />
	</div>
</Footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
