<script lang="ts">
	import type { SectionTreeResponse } from '$lib/types';
	import SectionItem from './SectionItem.svelte';
	export let sections: SectionTreeResponse;
</script>

<aside class="max-w-xs border-r py-4 pr-4">
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
