<script lang="ts">
	import { currentProject } from "$lib/stores";
	import type { ProjectsResponse } from "$lib/types";
	import IconChevronDown from "$lib/icons/IconChevronDown.svelte";
	import { slide } from "svelte/transition";
	import { clickOutsideAction } from "$lib/utils";

	export let projects: ProjectsResponse;

	let open = false;
</script>

<div class="flex items-center text-base text-slate-500">
	<div class="relative w-48" use:clickOutsideAction on:clickoutside={() => (open = false)}>
		<button
			class="w-full rounded-md border border-slate-300 py-1 pl-2 pr-2 focus:border-slate-400 focus:bg-slate-50"
			on:click={() => (open = !open)}
		>
			<span class="flex items-center justify-between gap-2">
				{#if $currentProject}
					{$currentProject.name}
				{:else}
					Select a project
				{/if}
				<IconChevronDown size={16} class="{open ? 'rotate-180' : ''} transition-transform" />
			</span>
		</button>
		{#if open && projects}
			<ul
				transition:slide={{ duration: 100 }}
				class="absolute z-10 mt-1 flex w-full flex-col truncate rounded-md border border-slate-300 bg-white py-1 shadow-sm"
			>
				{#each projects as project}
					<li class="w-full">
						<button
							on:click={() => {
								$currentProject = project;
								open = false;
							}}
							class="w-full py-1 px-4 text-left hover:bg-slate-50"
						>
							{project.name}
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
