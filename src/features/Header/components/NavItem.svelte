<script lang="ts">
	import home from '$lib/images/home.svg';
	import object from '$lib/images/object.svg';
	import calendar from '$lib/images/calendar.svg';
	import { page } from '$app/stores';

	export let path: string;
	export let name: string;

	$: image = path === '/' ? home : path.includes('/projects') ? object : calendar;
	$: active = path === '/' ? $page.url.pathname === '/' : $page.url.pathname.includes(path);
</script>

<li
	aria-current={active ? 'page' : undefined}
	class={active ? 'border-b-4 border-b-slate-500' : undefined}
>
	<a href={path} class="flex items-center gap-4 py-3 px-4">
		<img src={image} alt={name} />
		<span>{name}</span>
	</a>
</li>
