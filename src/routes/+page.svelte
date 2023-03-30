<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
	const projects = data.projects;
</script>

<svelte:head>
	<title>QAwful Welcome!</title>
	<meta name="description" content="Manage you QA test runs!" />
</svelte:head>

<section class="px-24 py-32">
	<h1 class="flex items-center justify-center font-Quicksand">
		<span class="mr-8 text-3xl">welcome to</span>
		<span class="rounded-md p-4 text-6xl font-semibold text-cyan-700 underline">
			<strong class="font-Merriweather text-cyan-500">QA</strong>wful</span
		>
	</h1>
	<h3 class="mt-24 text-center font-Quicksand text-2xl text-cyan-600">
		Empower Your QA with the Ultimate Testcase Management Solution!
	</h3>
</section>

<section class="mt-32 bg-slate-50 px-24 py-32">
	<p>
		QAwful is a test case management app designed to simplify the QA process and deliver high-quality software. It
		provides a centralized location for storing and organizing test cases, making it easier for teams to collaborate and
		track progress.
	</p>
</section>
