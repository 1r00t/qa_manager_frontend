import type { PageServerLoad } from './$types';
import type { ProjectsResponse } from '$lib/types';
import { BACKEND_URL } from '$env/static/private';

export const load: PageServerLoad = async ({ fetch }) => {
	const projects: ProjectsResponse = await fetch(`${BACKEND_URL}/projects/`).then((res) =>
		res.json()
	);
	return {
		projects
	};
};
