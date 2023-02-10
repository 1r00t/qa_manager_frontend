<script lang="ts">
	import '../app.css';

	import type { LayoutData } from './$types';
	import { fly } from 'svelte/transition';
	import { currentProject } from '$lib/stores';
	import { IconFolders } from '@tabler/icons-svelte';

	export let data: LayoutData;
</script>

<header class="text-xl">
	<nav class="container mx-auto flex h-28 items-center justify-between">
		<div class="flex items-center gap-16">
			<strong><a href="/">QA</a></strong>
			{#if $currentProject}
				{#key $currentProject.id}
					<a
						href="projects/{$currentProject.slug}"
						in:fly={{ y: -30, duration: 200, delay: 150 }}
						out:fly={{ y: -30, duration: 150 }}
						class="flex items-center gap-1 rounded border border-dashed border-blue-500 px-4 py-2 text-sm font-thin text-blue-600"
					>
						<IconFolders stroke={1} size={16} />
						{$currentProject.name}
					</a>
				{/key}
			{:else if data.currentPath !== '/projects'}
				<a
					in:fly={{ y: -30, duration: 200, delay: 150 }}
					out:fly={{ y: -30, duration: 150 }}
					href="/projects"
					class="rounded bg-blue-500 py-2 px-4 text-sm text-blue-50 transition-colors hover:bg-blue-600"
					>Select a Project!</a
				>
			{/if}
		</div>
		<ul class="flex gap-6">
			<li><a href="/projects">Projects</a></li>
			<li><a href="/">Testruns</a></li>
			<li><a href="/testcases">Testcases</a></li>
		</ul>
	</nav>
</header>

<main class="container mx-auto antialiased">
	{#key data.currentPath}
		<div in:fly={{ y: -30, duration: 200, delay: 150 }} out:fly={{ y: -30, duration: 150 }}>
			<slot />
		</div>
	{/key}
</main>
