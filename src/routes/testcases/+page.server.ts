import { BACKEND_URL } from '$env/static/private';
import type { SectionTreeResponse } from '$lib/types';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const sections: SectionTreeResponse = await fetch(`${BACKEND_URL}/sections/tree/`).then((res) =>
		res.json()
	);
	return {
		sections
	};
};
