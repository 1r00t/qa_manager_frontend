<script lang="ts">
	import type { TestCasesResponse } from "$lib/types";
	import { fade, fly } from "svelte/transition";
	import type { PageServerData } from "./$types";
	import { debounce } from "$lib/utils";
	import LoadingSpinner from "./LoadingSpinner.svelte";
	import { goto } from "$app/navigation";

	import SectionsTree from "./SectionsTree.svelte";
	import TestcasesTable from "./TestcasesTable.svelte";
	import { currentSection, checkedTestcases, sections, testcases } from "$lib/stores";
	import { IconSquareRoundedPlusFilled, IconX, IconSearch } from "@tabler/icons-svelte";

	export let data: PageServerData;

	$sections = data.sections;

	let loadingTestcases = false;

	$: numSelectedTestcases = Object.values($checkedTestcases).flat().length;

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

	let searchInput = "";

	async function searchTestcases() {
		if (searchInput.length < 2) return;
		const testcaseItems: TestCasesResponse["items"] = await fetch(`api/testcases/search?query=${searchInput}`, {
			method: "POST",
		}).then((res) => res.json());
		$testcases = { items: testcaseItems, count: testcaseItems?.length || 0 };
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
		<div class="relative flex h-16 w-72 items-center">
			<input
				type="search"
				name="search"
				bind:value={searchInput}
				on:input={debounce(searchTestcases, 500)}
				class="border-1 absolute w-full rounded-md border-slate-300 bg-slate-50 pl-10 text-slate-600 transition-colors placeholder:text-slate-300 focus:border-slate-400 focus:bg-slate-100 focus:ring-0"
				placeholder="search"
			/>
			<div class="absolute left-2 flex items-center text-slate-400">
				<IconSearch size={20} />
			</div>
			{#if searchInput.length}
				<div class="absolute right-2 flex items-center text-slate-400" in:fly>
					<button class="hover:text-slate-600" on:click={() => (searchInput = "")}>
						<IconX stroke={1} />
					</button>
				</div>
			{/if}
		</div>

		{#if numSelectedTestcases}
			<div
				class="flex items-center rounded-full bg-slate-600 pr-3 text-xs text-slate-50 transition-colors hover:bg-slate-800"
				transition:fade={{ duration: 100 }}
			>
				<a
					href="/testruns/create"
					class="flex w-full items-center gap-1 rounded-full py-2 pr-2 pl-3 transition-colors hover:text-blue-200"
					><strong>{numSelectedTestcases}</strong><span class="mb-0.5">selected</span></a
				>
				<button class="transition-colors hover:text-red-400" on:click={() => ($checkedTestcases = {})}
					><IconX size={16} /></button
				>
			</div>
		{/if}
		<button
			class="flex items-center gap-2 rounded bg-blue-500 py-2 px-2 text-sm text-blue-50 transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
			on:click={() => goto("/testruns/create")}
			disabled={numSelectedTestcases === 0}
		>
			Create Testrun
			<IconSquareRoundedPlusFilled class="mt-0.5" />
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
