<script lang="ts">
	import type { SectionTreeResponse } from "$lib/types";
	import IconFolder from "$lib/icons/IconFolder.svelte";
	import { currentSection } from "$lib/stores";

	import { createEventDispatcher } from "svelte";
	import { fly } from "svelte/transition";

	const dispatch = createEventDispatcher();

	export let section: SectionTreeResponse[0];
	export let numSelectedTestcases: number;

	$: isActive = $currentSection === section.id;

	function sectionClicked(id: number) {
		dispatch("sectionClick", id);
	}
</script>

<!-- <div
	class="z-50 flex h-full w-full items-center gap-1 rounded-sm px-0 hover:bg-blue-50 {isActive
		? 'bg-blue-100 hover:bg-blue-100'
		: ''}"
>
	<IconFolder size={16} class="flex-shrink-0 fill-yellow-400 text-yellow-400" />

	<button class="relative h-full w-full rounded text-left" on:click={() => sectionClicked(section.id)}>
		<span class="flex">{section.name}</span>
		{#if numSelectedTestcases}
			<span
				transition:fly
				class="absolute right-1 top-1 bottom-1 flex items-center rounded-md bg-blue-400 px-1 text-xs font-bold text-blue-50 ring-2 ring-white"
			>
				{numSelectedTestcases}
			</span>
		{/if}
	</button>
</div> -->

<div class="flex w-full truncate hover:bg-blue-50 {isActive ? 'bg-blue-100 hover:bg-blue-200' : ''}">
	<button
		class="relative flex w-full items-center space-x-2 truncate text-left"
		on:click={() => sectionClicked(section.id)}
	>
		<IconFolder size={16} class="flex-shrink-0 fill-yellow-400 text-yellow-400" />
		<span class="w-full truncate pr-2">{section.name}</span>
		{#if numSelectedTestcases}
			<span
				class="absolute right-1 top-1 bottom-1 z-10 flex items-center justify-center rounded-md bg-blue-400 px-1 text-xs font-bold text-blue-50 ring-2 ring-white"
				>{numSelectedTestcases}</span
			>
		{/if}
	</button>
</div>
