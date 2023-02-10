<script lang="ts">
	import { currentProject } from '$lib/stores';
	import type { PageData } from './$types';

	export let data: PageData;
	const projects = data.projects;

	function selectProject(id: number) {
		if (id === 0) $currentProject = {};
		$currentProject = projects.filter((p) => p.id === id)[0];
	}
</script>

<section class="mt-16">
	<h3 class="text-2xl font-semibold">All projects</h3>
</section>

<section class="mt-16">
	<h4 class="text-xl">Select a project</h4>
	<ul class="mt-16">
		{#each projects as project}
			<li><button on:click={() => selectProject(project.id)}>{project.name}</button></li>
		{/each}
		<li><button on:click={() => selectProject(0)}>None</button></li>
	</ul>
</section>
