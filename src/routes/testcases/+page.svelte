<script lang="ts">
	import type { TestCasesResponse } from "$lib/types";
	import { fade } from "svelte/transition";
	import type { PageServerData } from "./$types";
	import LoadingSpinner from "./LoadingSpinner.svelte";
	import { goto } from "$app/navigation";

	import SectionsTree from "./SectionsTree.svelte";
	import TestcasesTable from "./TestcasesTable.svelte";
	import { currentSection, checkedTestcases, sections, testcases } from "$lib/stores";
	import { IconSquareRoundedPlusFilled } from "@tabler/icons-svelte";

	export let data: PageServerData;

	$sections = data.sections;

	let loadingTestcases = false;

	$: numSelectedTestcases = $checkedTestcases.size;

	async function fetchTestcases() {
		const testcaseItems: TestCasesResponse["items"] = await fetch(`api/section?id=${$currentSection}`).then((res) =>
			res.json()
		);
		$testcases = { items: testcaseItems, count: testcaseItems?.length || 0 };
	}

	async function sectionClick(e: CustomEvent) {
		const clickedSectionId = e.detail as number;
		if (clickedSectionId === $currentSection) return;
		loadingTestcases = true;
		$currentSection = clickedSectionId;
		await fetchTestcases();
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
	<div class="flex w-full items-center justify-between gap-6">
		<div />
		<div>
			{#if numSelectedTestcases}
				<a
					href="/testruns/create"
					transition:fade={{ duration: 100 }}
					class="rounded-full bg-slate-600 px-2 py-1 text-xs text-slate-50"
					><strong>{numSelectedTestcases}</strong> selected</a
				>
			{/if}
		</div>
		<button
			class="flex items-center gap-2 rounded bg-blue-500 py-1 px-2 text-sm text-blue-50 transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
			on:click={() => goto("/testruns/create")}
			disabled={numSelectedTestcases === 0}
		>
			Create Testrun
			<IconSquareRoundedPlusFilled class="mt-1" />
		</button>
	</div>
</section>

<section class="mt-6">
	<div class="flex">
		<SectionsTree sections={$sections} on:sectionClick={sectionClick} />
		{#if loadingTestcases}
			<div class="flex w-full justify-center pl-4" in:fade>
				<LoadingSpinner />
			</div>
		{:else}
			<TestcasesTable testcases={$testcases} />
		{/if}
	</div>
</section>
