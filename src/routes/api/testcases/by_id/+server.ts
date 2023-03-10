import { BACKEND_URL } from '$env/static/private';
import type { TestCasesResponse } from '$lib/types';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ url, fetch, request }) => {
	const limit = Number(url.searchParams.get('limit') ?? '100');
	const offset = Number(url.searchParams.get('offset') ?? '0');
	const testcaseIds: number[] = await request.json();
	if (!testcaseIds) throw error(400, 'no testcase ids provided');

	const testcases: TestCasesResponse = await fetch(
		`${BACKEND_URL}/testcases/by_id/?limit=${limit}&offset=${offset}`,
		{ method: 'POST', body: JSON.stringify(testcaseIds) }
	).then((res) => res.json());

	return json(testcases);
};
