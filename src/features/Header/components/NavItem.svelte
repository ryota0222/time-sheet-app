<script lang="ts">
	import home from '$lib/images/home.svg';
	import object from '$lib/images/object.svg';
	import calendar from '$lib/images/calendar.svg';

	export let pathname: string;
	export let currentPathname: string;
	export let name: string;

	$: image = pathname === '/' ? home : pathname.includes('/projects') ? object : calendar;
	$: active = pathname === '/' ? currentPathname === '/' : currentPathname.includes(pathname);
</script>

<li
	aria-current={active ? 'page' : undefined}
	class={active ? 'border-b-4 border-b-slate-500' : undefined}
>
	<a data-sveltekit-preload-data href={pathname} class="flex items-center gap-4 py-3 px-4">
		<img src={image} alt={name} />
		<span>{name}</span>
	</a>
</li>
