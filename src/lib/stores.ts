import { writable, type Writable } from "svelte/store";
import type { ProjectsResponse, SectionTreeResponse, TestCasesResponse } from "./types";

// export const testcases: Writable<TestCasesResponse> = writable();
export const currentProject: Writable<ProjectsResponse[0] | Record<string, never>> = writable();
export const currentSection: Writable<number> = writable(0);
export const checkedTestcases: Writable<Set<number>> = writable(new Set());

export const testcases: Writable<TestCasesResponse> = writable();

// ich will dass bei jeder section auch steht wieviel test selektiert sind.
// wie in so einer badge am ende
// export const checkedSectionsNum: Writable<[number, number][]> = writable([]);

export const sections: Writable<SectionTreeResponse> = writable();
export const expandedSections: Writable<Set<number>> = writable(new Set());
