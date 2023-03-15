import { BACKEND_URL } from "$env/static/private";
import type { TestCasesResponse } from "$lib/types";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url, fetch }) => {
	const limit = Number(url.searchParams.get("limit") ?? "100");
	const offset = Number(url.searchParams.get("offset") ?? "0");

	const testcases: TestCasesResponse = await fetch(`${BACKEND_URL}/testcases/?limit=${limit}&offset=${offset}`).then(
		(res) => res.json()
	);

	return json(testcases);
};
