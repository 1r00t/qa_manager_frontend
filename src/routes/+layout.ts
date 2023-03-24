import type { ProjectsResponse } from "$lib/types";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ url, data }) => {
	const { projects } = data;
	return {
		currentPath: url.pathname,
		projects,
	};
};
