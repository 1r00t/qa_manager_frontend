<script lang="ts">
	import type { SectionTreeResponse } from "$lib/types";
	import { IconFolder } from "@tabler/icons-svelte";
	import { currentSection } from "$lib/stores";

	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	export let section: SectionTreeResponse[0];

	$: isActive = $currentSection === section.id;

	function sectionClicked(id: number) {
		dispatch("sectionClick", id);
	}
</script>

<div
	class="z-50 -mx-1 flex h-full w-full items-center gap-2 px-1 hover:bg-blue-50 {isActive
		? 'bg-blue-100 hover:bg-blue-100'
		: ''}"
>
	<IconFolder size={16} class="flex-shrink-0 fill-yellow-400 text-yellow-400" />
	<button class="h-full w-full truncate rounded text-left" on:click={() => sectionClicked(section.id)}>
		{section.name}
	</button>
</div>
