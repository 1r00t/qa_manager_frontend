<script lang="ts">
	import type { SectionTreeResponse } from "$lib/types";

	import IconChevronRight from "$lib/icons/IconChevronRight.svelte";
	import SectionName from "./SectionName.svelte";
	import { slide } from "svelte/transition";
	import { expandedSections, checkedTestcases } from "$lib/stores";

	export let section: SectionTreeResponse[0];

	let numSelectedTestcases = 0;

	function num(s: SectionTreeResponse[0]): number {
		s.children.forEach((child) => num(child));
		return (numSelectedTestcases += $checkedTestcases[s.id]?.length || 0);
	}
	$: {
		$checkedTestcases;
		numSelectedTestcases = 0;
		numSelectedTestcases = num(section);
	}

	let isExpanded = $expandedSections.has(section.id);

	function toggleExpanded() {
		if ($expandedSections.has(section.id)) {
			$expandedSections.delete(section.id);
			isExpanded = false;
		} else {
			$expandedSections.add(section.id);
			isExpanded = true;
		}
	}
</script>

{#if section.children.length > 0}
	<div class="flex items-center pl-1">
		<button aria-label="toggle folder expansion" on:click={toggleExpanded}>
			<IconChevronRight
				size={16}
				class="flex-shrink-0 transition-transform hover:text-blue-600 {isExpanded ? 'rotate-90' : ''}"
			/>
		</button>
		<SectionName {section} on:sectionClick {numSelectedTestcases} />
	</div>
	{#if isExpanded}
		<ul class="ml-4 pl-1" transition:slide={{ duration: 200 }}>
			{#each section.children as child (child.id)}
				<li>
					<svelte:self section={child} on:sectionClick />
				</li>
			{/each}
		</ul>
	{/if}
{:else}
	<div class="ml-4 pl-1">
		<SectionName {section} on:sectionClick {numSelectedTestcases} />
	</div>
{/if}
