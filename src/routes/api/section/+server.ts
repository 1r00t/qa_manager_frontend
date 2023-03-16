import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { BACKEND_URL } from "$env/static/private";
import type { TestCasesResponse } from "$lib/types";

export const GET: RequestHandler = async ({ url, fetch }) => {
	const section_id = Number(url.searchParams.get("id") ?? 0);

	if (!section_id) throw error(400, "Please provide a section ID!");

	const testcases: TestCasesResponse = await fetch(`${BACKEND_URL}/testcases/section/${section_id}/`).then((res) =>
		res.json()
	);

	return json(testcases);
};
