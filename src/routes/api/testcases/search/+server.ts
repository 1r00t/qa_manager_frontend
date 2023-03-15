import { BACKEND_URL } from "$env/static/private";
import type { TestCasesResponse } from "$lib/types";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ url, fetch }) => {
	const query = url.searchParams.get("query") ?? "";

	if (query.length < 2) throw error(400, "Please enter a valid query with at least 2 characters");

	const testcases: TestCasesResponse["items"] = await fetch(`${BACKEND_URL}/testcases/search/?query=${query}`, {
		method: "POST",
	}).then((res) => res.json());

	return json(testcases);
};
