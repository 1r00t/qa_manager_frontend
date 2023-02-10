<script lang="ts">
	import type { SectionTreeResponse } from '$lib/types';

	import { IconChevronRight } from '@tabler/icons-svelte';
	import SectionName from './SectionName.svelte';
	import { slide } from 'svelte/transition';

	export let section: SectionTreeResponse[0];

	let isExpanded = false;
</script>

{#if section.children.length > 0}
	<div class="flex items-center gap-2">
		<button
			on:click={() => {
				isExpanded = !isExpanded;
			}}
		>
			<IconChevronRight
				size={16}
				class="flex-shrink-0 transition-transform {isExpanded ? 'rotate-45' : ''}"
			/>
		</button>
		<SectionName {section} on:sectionClick />
	</div>
	{#if isExpanded}
		<ul class="ml-4" transition:slide={{ duration: 200 }}>
			{#each section.children as child (child.id)}
				<li>
					<svelte:self section={child} on:sectionClick />
				</li>
			{/each}
		</ul>
	{/if}
{:else}
	<div class="ml-6 flex items-center gap-2">
		<SectionName {section} on:sectionClick />
	</div>
{/if}
