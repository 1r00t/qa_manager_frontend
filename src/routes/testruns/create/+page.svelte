<script lang="ts">
	import { checkedTestcases } from "$lib/stores";
	import type { TestCasesResponse } from "$lib/types";
	import { IconX } from "@tabler/icons-svelte";
	import { onMount } from "svelte/internal";
	import { fade, fly } from "svelte/transition";
	import { flip } from "svelte/animate";

	let testcases: TestCasesResponse;
	let loading = false;

	onMount(async () => {
		loading = true;
		testcases = await fetch("/api/testcases/by_id", {
			method: "POST",
			body: JSON.stringify(Array.from($checkedTestcases)),
		}).then((response) => response.json());
		loading = false;
	});

	function removeTestcase(id: number) {
		testcases.items = testcases.items?.filter((item) => item.id !== id);
		testcases.count -= 1;
		$checkedTestcases.delete(id);
	}
</script>

<svelte:head>
	<title>QAManager testcases selected</title>
	<meta name="description" content="Show selected testcases and create a new testrun" />
</svelte:head>

<section class="mt-16">
	<h3 class="text-2xl font-semibold">Create new Testrun</h3>
</section>

<section>
	<h4 class="mt-16 text-xl">Selected testcases</h4>
</section>

<section class="mt-16 flex w-full items-center">
	{#if testcases?.items?.length}
		<div class="pl-4" in:fade>
			<table class="w-full table-fixed">
				<thead class="">
					<tr class="text-left">
						<th class="w-16 py-2">ID</th>
						<th class="mr-10">Title</th>
						<th class="w-60 py-2">Section</th>
						<th class="w-16" />
					</tr>
				</thead>
				<tbody>
					{#each testcases.items as item (item.id)}
						<tr
							class="group cursor-default hover:bg-gray-50"
							transition:fly|local={{ x: -50 }}
							animate:flip={{ delay: 150 }}
						>
							<td class="py-2">{item.case_id}</td>
							<td class="truncate py-2 pr-2">{item.title}</td>
							<td class="truncate py-2">{item.section.full_section_hierachy}</td>
							<td class="flex items-center justify-end py-2 pr-2">
								<button
									class="flex items-center text-gray-400 opacity-0 hover:text-red-500 group-hover:opacity-100"
									on:click={() => removeTestcase(item.id)}
								>
									<IconX />
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<span in:fade={{ delay: 200 }}>please select testcases first</span>
	{/if}
</section>
