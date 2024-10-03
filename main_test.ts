import { assertExists } from "@std/assert";
import { expect } from "@std/expect";
import { absences, createTimebutlerApiCaller } from "./main.ts";

Deno.test(async function testAbsences() {
  const apiKey = Deno.env.get("TIMEBUTLER_API_KEY");
  assertExists(apiKey);
  const caller = createTimebutlerApiCaller(apiKey);
  expect(caller).toBeDefined();
  expect(typeof caller).toEqual("function");
  const result = await absences(caller);
  expect(Array.isArray(result)).toBeTruthy();
});
