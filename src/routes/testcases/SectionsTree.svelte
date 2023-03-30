<script lang="ts">
	import type { SectionTreeResponse } from "$lib/types";
	import SectionItem from "./SectionItem.svelte";
	export let sections: SectionTreeResponse;
</script>

<aside class="h-[70vh] w-80 flex-none overflow-y-auto overscroll-contain border-r border-slate-300 py-2">
	{#if sections}
		<ul>
			{#each sections as section}
				<li>
					<SectionItem {section} on:sectionClick />
				</li>
			{/each}
		</ul>
	{/if}
</aside>
