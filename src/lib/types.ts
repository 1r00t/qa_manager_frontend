import type { paths } from "../api";

export type ProjectsResponse = paths["/api/projects/"]["get"]["responses"]["200"]["content"]["application/json"];

export type TestCasesResponse = paths["/api/testcases/"]["get"]["responses"]["200"]["content"]["application/json"];
export type TestCase = NonNullable<
	paths["/api/testcases/"]["get"]["responses"]["200"]["content"]["application/json"]["items"]
>[0];

export type SectionResponse = paths["/api/sections/"]["get"]["responses"]["200"]["content"]["application/json"];

export type SectionTreeResponse =
	paths["/api/sections/tree/"]["get"]["responses"]["200"]["content"]["application/json"];
