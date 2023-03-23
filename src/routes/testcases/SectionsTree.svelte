<script lang="ts">
	import type { SectionTreeResponse } from "$lib/types";
	import SectionItem from "./SectionItem.svelte";
	export let sections: SectionTreeResponse;
</script>

<aside class="h-[70vh] max-w-xs flex-none overflow-y-auto overscroll-contain border-r border-slate-300 py-4 pr-4">
	{#if sections}
		<ul>
			{#each sections as section}
				<li class="truncate">
					<SectionItem {section} on:sectionClick />
				</li>
			{/each}
		</ul>
	{/if}
</aside>
