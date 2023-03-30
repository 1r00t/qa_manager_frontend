<script lang="ts">
	import "../app.css";
	import "@fontsource/quicksand/300.css";
	import "@fontsource/quicksand/400.css";
	import "@fontsource/quicksand/500.css";
	import "@fontsource/quicksand/600.css";
	import "@fontsource/quicksand/700.css";
	import "@fontsource/merriweather/300.css";
	import "@fontsource/merriweather/400.css";
	import "@fontsource/merriweather/700.css";
	import "@fontsource/merriweather/900.css";

	import type { LayoutData } from "./$types";
	import { fly } from "svelte/transition";
	import ProjectSelector from "./ProjectSelector.svelte";

	export let data: LayoutData;

	const { projects } = data;

	let logo = Math.random() > 0.5 ? "QAwesome" : "QAwful";
</script>

<header class="text-xl">
	<nav class="container mx-auto flex h-28 items-center justify-between">
		<div class="flex items-center gap-16 font-Merriweather">
			<strong><a href="/">{logo}</a></strong>
		</div>
		<ProjectSelector {projects} />
		<ul class="flex h-full items-center font-Merriweather font-bold">
			<li class="h-full">
				<a
					class="flex h-full items-center px-10 {data.currentPath.startsWith('/projects') ? 'text-blue-500' : ''}"
					href="/projects">Projects</a
				>
			</li>
			<li>
				<a
					class="flex h-full items-center px-10 {data.currentPath.startsWith('/testruns') ? 'text-blue-500' : ''}"
					href="/testruns">Testruns</a
				>
			</li>
			<li>
				<a
					class="flex h-full items-center px-10 {data.currentPath.startsWith('/testcases') ? 'text-blue-500' : ''}"
					href="/testcases">Testcases</a
				>
			</li>
		</ul>
	</nav>
</header>

<main class="container mx-auto text-slate-600 antialiased">
	{#key data.currentPath}
		<div in:fly={{ y: -30, duration: 200, delay: 150 }} out:fly={{ y: -30, duration: 150 }}>
			<slot />
		</div>
	{/key}
</main>
