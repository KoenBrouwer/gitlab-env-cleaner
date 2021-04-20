import * as dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const projectId = process.env.GITLAB_PROJECT_ID;
const token = process.env.CI_JOB_TOKEN;
const baseURL = "http://gitlab.com/api/v4";

export const createUrl = (path: string): string => {
	return baseURL + path;
};

export const makeRequest = (url: string, method: "GET" | "POST" | "DELETE" = "GET") => {
	return fetch(url, {
		method,
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`,
		},
	})
		.then(async result => [
			await result.json(),
			result,
		])
		.catch(err => {
			console.error("ERROR", err.message);
		});
};

export const getPagination = (response: Response) => {
	return {
		page: response.headers.get("x-page"),
		total: response.headers.get("x-total"),
		totalPages: response.headers.get("x-total-pages"),
	};
};

export const urls = {
	environments: (page: number = 1) => createUrl(`/projects/${projectId}/environments?per_page=100&page=${page}`),
};

export const getAllEnvironments = async () => {
	let totalPages = 1;
	let page = 1;

	const envs = [];

	do {
		const url = urls.environments(page);
		const [data, result] = await makeRequest(url);
		const pagination = getPagination(result);

		// Populate the environments
		envs.push(...data);

		totalPages = parseInt(pagination.totalPages);
		page++;
	} while (page <= totalPages);

	return envs;
};

export const deleteEnvironment = async (envId: string) => {
	const url = createUrl(`/projects/${projectId}/environments/${envId}`);
	return await makeRequest(url, "DELETE");
};