<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
	const projects = data.projects;
</script>

<svelte:head>
	<title>QAManager home</title>
	<meta name="description" content="Manage you QA test runs!" />
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
