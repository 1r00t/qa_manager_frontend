<script lang="ts">
	import { checkedTestcases } from "$lib/stores";
	import type { TestCase, TestCasesResponse } from "$lib/types";
	import IconX from "$lib/icons/IconX.svelte";
	import { onMount } from "svelte/internal";
	import { fade, fly } from "svelte/transition";
	import { flip } from "svelte/animate";

	let testcases: TestCasesResponse;
	let loading = false;

	onMount(async () => {
		loading = true;
		testcases = await fetch("/api/testcases/by_id", {
			method: "POST",
			body: JSON.stringify(Array.from(Object.values($checkedTestcases).flat())),
		}).then((response) => response.json());
		loading = false;
	});

	function removeTestcase(testcase: TestCase) {
		testcases.items = testcases.items?.filter((item) => item.id !== testcase.id);
		testcases.count -= 1;
		$checkedTestcases[testcase.section.id].splice($checkedTestcases[testcase.section.id].indexOf(testcase.id), 1);
	}
</script>

<svelte:head>
	<title>QAManager testcases selected</title>
	<meta name="description" content="Show selected testcases and create a new testrun" />
</svelte:head>

<section class="mt-16">
	<h3 class="text-4xl font-semibold">Create new Testrun</h3>
</section>

<section>
	<h4 class="mt-16 text-xl">Selected testcases</h4>
</section>

<section
	class="mt-16 flex h-[65vh] w-full items-start overflow-y-auto overscroll-contain rounded-md border border-slate-300"
>
	{#if testcases?.items?.length}
		<div in:fade>
			<table class="w-full table-fixed">
				<thead class="sticky top-0 bg-white">
					<tr class="text-left">
						<th class="w-16 py-2 pl-4">ID</th>
						<th class="mr-10">Title</th>
						<th class="w-60 py-2">Section</th>
						<th class="w-16 pr-4" />
					</tr>
				</thead>
				<tbody>
					{#each testcases.items as item (item.id)}
						<tr
							class="group cursor-default hover:bg-gray-50"
							transition:fly|local={{ x: -50 }}
							animate:flip={{ delay: 150 }}
						>
							<td class="py-2 pl-4">{item.case_id}</td>
							<td class="truncate py-2 pr-2">{item.title}</td>
							<td class="truncate py-2">{item.section.full_section_hierachy}</td>
							<td class="flex items-center justify-end py-2 pr-4">
								<button
									class="flex items-center text-gray-400 opacity-0 hover:text-red-500 group-hover:opacity-100"
									on:click={() => removeTestcase(item)}
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
