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
] as const;
export type Endpoint = (typeof ENDPOINTS)[number];

export const EXTENDED_ENDPOINTS = ["personnelfiles", "salaries"] as const;
export type ExtendedEnpoint = (typeof EXTENDED_ENDPOINTS)[number];

export type TimebutlerApiParams = Record<string, string | number | boolean>;

/**
 * Calls the Timebutler API for a given endpoint and parameters.
 * @param normalApiKey The key to use for standard API endpoints.
 * @param extendendApiKey The key to use for extended API endpoints. If `null`, no extended API endpoints can be called.
 * @param endpoint The endpoint to call.
 * @param params The parameters to pass to the API. Defaults to an empty object.
 * @param files If provided, a record of files to send with the request. Defaults to `undefined`.
 * @returns A promise that resolves to the response text.
 */
async function callTimebutlerApi(
  normalApiKey: NonNullable<string>,
  extendendApiKey: string | null,
  endpoint: Endpoint | ExtendedEnpoint,
  params: TimebutlerApiParams = {},
  files?: Record<string, File>,
): Promise<string> {
  let apiKey: string;
  if (ENDPOINTS.includes(endpoint as Endpoint)) {
    apiKey = normalApiKey;
  } else if (EXTENDED_ENDPOINTS.includes(endpoint as ExtendedEnpoint)) {
    if (typeof extendendApiKey !== "string") {
      throw new Error("no extended api key provided");
    }
    apiKey = extendendApiKey;
  } else {
    throw new Error("unknown endpoint");
  }
  const req: RequestInit = { method: "POST" };
  if (files === undefined) {
    const body: BodyInit = Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .concat(`auth=${encodeURIComponent(apiKey)}`)
      .join("&");
    req.body = body;
    req.headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
  } else {
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
 * @returns {Function} A bound Timebutler API caller function.
 */
export const createTimebutlerApiCaller: (
  apiKey: NonNullable<string>,
  extendedApiKey?: string | null,
) => (
  endpoint: Endpoint | ExtendedEnpoint,
  params?: TimebutlerApiParams,
  files?: Record<string, File>,
) => Promise<string> = (
  apiKey: NonNullable<string>,
  extendedApiKey: string | null = null,
) => callTimebutlerApi.bind(null, apiKey, extendedApiKey);
export type TimebutlerApiCaller = ReturnType<typeof createTimebutlerApiCaller>;
