<script lang="ts">
	import type { TestCasesResponse, TestCase } from "$lib/types";
	import { fade } from "svelte/transition";

	import { checkedTestcases } from "$lib/stores";

	export let testcases: TestCasesResponse;

	$: filtered = testcases?.items?.map((testcase) => testcase);
	$: selectAll = filtered?.every((t) => Object.values($checkedTestcases).flat().includes(t.id));
	$: selectedAnyNotAll = filtered?.some((t) => Object.values($checkedTestcases).flat().includes(t.id)) && !selectAll;

	function toggleSelectAll() {
		selectAll = !selectAll;

		if (!filtered || filtered.length === 0) {
			return;
		}

		filtered.forEach((testcase) => {
			const sectionId = testcase.section.id;
			const testcaseId = testcase.id;

			if (selectAll) {
				// If selectAll is true, add all testcases to selectedTestcaseIds
				if (sectionId in $checkedTestcases) {
					if (!$checkedTestcases[sectionId].includes(testcaseId)) {
						$checkedTestcases[sectionId].push(testcaseId);
					}
				} else {
					$checkedTestcases[sectionId] = [testcaseId];
				}
			} else {
				// If selectAll is false, remove all testcases from selectedTestcaseIds
				delete $checkedTestcases[sectionId];
			}
		});
		$checkedTestcases = $checkedTestcases;
	}

	function toggleChecked(testcase: TestCase) {
		const sectionId = testcase.section.id;
		const currentTestcaseIds = $checkedTestcases[sectionId] || [];

		if (currentTestcaseIds.includes(testcase.id)) {
			const updatedTestcaseIds = currentTestcaseIds.filter((id) => id !== testcase.id);
			if (updatedTestcaseIds.length === 0) {
				delete $checkedTestcases[sectionId];
			} else {
				$checkedTestcases[sectionId] = updatedTestcaseIds;
			}
		} else {
			$checkedTestcases[sectionId] = [...currentTestcaseIds, testcase.id];
		}
		$checkedTestcases = $checkedTestcases;
	}
</script>

{#if filtered?.length}
	<div class="h-[65vh] flex-1 overflow-y-auto overscroll-contain pl-4" in:fade>
		<table class="w-full table-fixed">
			<thead class="">
				<tr class="text-left">
					<th class="w-8 py-2">
						<input
							type="checkbox"
							name="select-all"
							on:change={toggleSelectAll}
							checked={selectAll}
							indeterminate={selectedAnyNotAll}
							class="cursor-pointer rounded-sm text-blue-400 transition-colors duration-300 checked:ring-blue-400 focus:ring-blue-400"
						/>
					</th>
					<th class="w-16 py-2">ID</th>
					<th class="py-2">Title</th>
				</tr>
			</thead>
			<tbody>
				{#each filtered as item (item.id)}
					<tr class="cursor-default hover:bg-gray-50">
						<td class="py-2"
							><input
								type="checkbox"
								name="select-testcase"
								value={item.id}
								checked={$checkedTestcases[item.section.id]?.includes(item.id)}
								on:change={() => toggleChecked(item)}
								class="cursor-pointer rounded-sm text-blue-400 transition-colors duration-300 checked:ring-blue-400 focus:ring-blue-400"
							/></td
						>
						<td class="py-2">{item.case_id}</td>
						<td class="truncate py-2">{item.title}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{:else}
	<div class="w-full pl-4 text-center">
		<h3 class="text-lg text-slate-500">Please select a section from the left</h3>
	</div>
{/if}
