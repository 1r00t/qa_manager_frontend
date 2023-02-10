<script lang="ts">
	import type { TestCasesResponse } from '$lib/types';
	import { fade } from 'svelte/transition';

	import { checkedTestcases } from '$lib/stores';

	export let testcases: TestCasesResponse;

	$: filtered = testcases.items?.map((testcase) => testcase);
	$: selectAll = filtered?.every((t) => $checkedTestcases.has(t.id));
	$: selectedAnyNotAll = filtered?.some((t) => $checkedTestcases.has(t.id)) && !selectAll;

	function toggleSelectAll() {
		selectAll = !selectAll;
		if (filtered && filtered.length) {
			const currentIds = filtered.map((item) => item.id);
			if (selectAll) {
				currentIds.forEach($checkedTestcases.add, $checkedTestcases);
				$checkedTestcases = $checkedTestcases;
			} else {
				$checkedTestcases.forEach((id) => {
					if (currentIds.includes(id)) $checkedTestcases.delete(id);
				});
				$checkedTestcases = $checkedTestcases;
			}
		}
	}

	function toggleChecked(itemId: number) {
		if ($checkedTestcases.has(itemId)) {
			$checkedTestcases.delete(itemId);
			$checkedTestcases = $checkedTestcases;
		} else {
			$checkedTestcases.add(itemId);
			$checkedTestcases = $checkedTestcases;
		}
	}

	$: console.log($checkedTestcases);
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
							class="text-blue-400 checked:ring-blue-400 focus:ring-blue-400"
						/>
					</th>
					<th class="w-16 py-2">ID</th>
					<th class="py-2">Title</th>
				</tr>
			</thead>
			<tbody>
				{#each filtered as item (item.id)}
					<tr>
						<td class="py-2"
							><input
								type="checkbox"
								name="select-testcase"
								value={item.id}
								checked={$checkedTestcases.has(item.id)}
								on:change={() => toggleChecked(item.id)}
								class="text-blue-400 checked:ring-blue-400 focus:ring-blue-400"
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
