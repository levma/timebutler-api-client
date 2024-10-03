export const ENDPOINTS = [
    "absences",
    "users",
    "holidayentitlement",
    "workdays",
    "holidaysets",
    "worktime",
    "projects",
    "projectsimport",
    "services",
    "timeclock",
    "timeimportbyevents",
];
export const EXTENDED_ENDPOINTS = ["personnelfiles", "salaries"];
/**
 * Calls the Timebutler API for a given endpoint and parameters.
 * @param normalApiKey The key to use for standard API endpoints.
 * @param extendendApiKey The key to use for extended API endpoints. If `null`, no extended API endpoints can be called.
 * @param endpoint The endpoint to call.
 * @param params The parameters to pass to the API. Defaults to an empty object.
 * @param files If provided, a record of files to send with the request. Defaults to `undefined`.
 * @returns A promise that resolves to the response text.
 */
async function callTimebutlerApi(normalApiKey, extendendApiKey, endpoint, params = {}, files) {
    let apiKey;
    if (ENDPOINTS.includes(endpoint)) {
        apiKey = normalApiKey;
    }
    else if (EXTENDED_ENDPOINTS.includes(endpoint)) {
        if (typeof extendendApiKey !== "string") {
            throw new Error("no extended api key provided");
        }
        apiKey = extendendApiKey;
    }
    else {
        throw new Error("unknown endpoint");
    }
    const req = { method: "POST" };
    if (files === undefined) {
        const body = Object.entries(params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .concat(`auth=${encodeURIComponent(apiKey)}`)
            .join("&");
        req.body = body;
        req.headers = {
            "Content-Type": "application/x-www-form-urlencoded",
        };
    }
    else {
        const formData = new FormData();
        Object.entries(files).forEach(([name, file]) => {
            formData.append(name, file);
        });
        Object.entries(params).forEach(([key, value]) => {
            formData.append(key, value.toString());
        });
        formData.append("auth", apiKey);
        req.body = formData;
    }
    const response = await fetch(`https://timebutler.de/api/v1/${endpoint}`, req);
    return response.text();
}
/**
 * Creates a Timebutler API caller function.
 *
 * @param {NonNullable<string>} apiKey - The API key used for authentication.
 * @param {string | null} [extendedApiKey=null] - The extended API key used for authentication.
 * @return {Function} A bound Timebutler API caller function.
 */
export const createTimebutlerApiCaller = (apiKey, extendedApiKey = null) => callTimebutlerApi.bind(null, apiKey, extendedApiKey);
