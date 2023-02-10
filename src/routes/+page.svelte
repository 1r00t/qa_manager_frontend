<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const projects = data.projects;
</script>

<svelte:head>
	<title>QA</title>
</svelte:head>

<section>
	<h3>Projects</h3>
</section>

<section>
	<aside>
		<nav>
			<ul>
				{#each projects as project}
					<li>
						<a href={project.slug}>{project.name}</a>
					</li>
				{/each}
			</ul>
		</nav>
	</aside>
</section>
