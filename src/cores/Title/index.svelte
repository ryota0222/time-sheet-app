<script lang="ts">
	export let tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';
	export let titleClass: string | undefined = 'mb-6';

	let fontSize: string;

	$: {
		switch (tag) {
			case 'h1':
			case 'h2':
				fontSize = 'text-3xl';
				break;
			case 'h3':
				fontSize = 'text-2xl';
				break;
			case 'h4':
				fontSize = 'text-xl';
				break;
			case 'h5':
				fontSize = 'text-lg';
				break;
			case 'h6':
				fontSize = 'text-base';
				break;
		}
	}
</script>

<svelte:element this={tag} class={`${fontSize} font-bold ${titleClass}`}>
	<slot />
</svelte:element>
