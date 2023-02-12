<script lang="ts">
	import type { TestCasesResponse } from '$lib/types';
	import { fade } from 'svelte/transition';
	import type { PageServerData } from './$types';
	import LoadingSpinner from './LoadingSpinner.svelte';

	import SectionsTree from './SectionsTree.svelte';
	import TestcasesTable from './TestcasesTable.svelte';
	import { currentSection, checkedTestcases } from '$lib/stores';

	export let data: PageServerData;

	const sections = data.sections;

	let testcases: TestCasesResponse = { items: [], count: 0 };

	let loadingTestcases = false;

	$: numSelectedTestcases = $checkedTestcases.size;

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

<svelte:head>
	<title>QAManager testcases</title>
	<meta name="description" content="List, edit and select testscases" />
</svelte:head>

<section class="mt-16">
	<h3 class="text-2xl font-semibold">All testcases</h3>
</section>

<section class="mt-16 flex h-10 w-full items-center">
	{#if numSelectedTestcases}
		<div class="w-full text-center">
			<a
				href="/testcases/selected"
				class="rounded-full bg-slate-600 px-2 py-1 text-xs text-slate-50"
				><strong>{numSelectedTestcases}</strong> selected</a
			>
		</div>
	{/if}
</section>

<section class="mt-6">
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
