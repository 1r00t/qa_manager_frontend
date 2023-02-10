import { writable, type Writable } from 'svelte/store';
import type { ProjectsResponse } from './types';

// export const testcases: Writable<TestCasesResponse> = writable();
export const currentProject: Writable<ProjectsResponse[0] | Record<string, never>> = writable();
export const currentSection: Writable<number> = writable(0);
export const checkedTestcases: Writable<Set<number>> = writable(new Set());
