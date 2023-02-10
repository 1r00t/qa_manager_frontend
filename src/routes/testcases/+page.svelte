<script lang="ts">
	import type { TestCasesResponse } from '$lib/types';
	import { fade } from 'svelte/transition';
	import type { PageServerData } from './$types';
	import LoadingSpinner from './LoadingSpinner.svelte';

	import SectionsTree from './SectionsTree.svelte';
	import TestcasesTable from './TestcasesTable.svelte';
	import { currentSection } from '$lib/stores';

	export let data: PageServerData;

	const sections = data.sections;

	let testcases: TestCasesResponse = { items: [], count: 0 };

	let loadingTestcases = false;

	async function sectionClick(e: CustomEvent) {
		loadingTestcases = true;
		$currentSection = e.detail as number;
		const testcaseItems: TestCasesResponse['items'] = await fetch(
			`api/section?id=${e.detail}`
		).then((res) => res.json());
		testcases = { items: testcaseItems, count: testcaseItems?.length || 0 };
		loadingTestcases = false;
	}
</script>

<section class="mt-16">
	<h3 class="text-2xl font-semibold">All testcases</h3>
</section>

<section class="mt-16">
	<div class="flex">
		<SectionsTree {sections} on:sectionClick={sectionClick} />
		{#if loadingTestcases}
			<div class="flex w-full justify-center pl-4" in:fade>
				<LoadingSpinner />
			</div>
		{:else}
			<TestcasesTable {testcases} />
		{/if}
	</div>
</section>
