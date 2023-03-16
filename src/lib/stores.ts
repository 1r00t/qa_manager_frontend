import { writable, derived, type Writable } from "svelte/store";
import type { ProjectsResponse, SectionTreeResponse, TestCasesResponse } from "./types";

export const testcases: Writable<TestCasesResponse> = writable();
export const sections: Writable<SectionTreeResponse> = writable();
export const currentProject: Writable<ProjectsResponse[0] | Record<string, never>> = writable();
export const currentSection: Writable<number> = writable(0);
// export const checkedTestcases: Writable<Set<number>> = writable(new Set());
export const expandedSections: Writable<Set<number>> = writable(new Set());
// export const selectedTestcaseInSectionCount = derived(
// 	[checkedTestcases, testcases],
// 	([$checkedTestcases, $testcases]) => {
// 		let sectionIds: { [key: number]: number } = {};
// 		$checkedTestcases.forEach((checkedTestcase) => {
// 			const sectionId = $testcases.items?.find((item) => item.id === checkedTestcase)?.section.id;
// 			if (sectionId) {
// 				if (sectionId in sectionIds) {
// 					sectionIds[sectionId] += 1;
// 				} else {
// 					sectionIds[sectionId] = 1;
// 				}
// 			}
// 		});
// 		return sectionIds;
// 	}
// );
export const checkedTestcases: Writable<{ [key: number]: number[] }> = writable({});
