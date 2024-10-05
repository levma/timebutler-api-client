import { bundle } from "jsr:@deno/emit";

const url = new URL("./client.ts", import.meta.url);
const result = await bundle(url, {
  importMap: "./deno.json",
  minify: true,
  type: "classic",
});

const { code } = result;

Deno.writeTextFileSync("./client.js", code);
