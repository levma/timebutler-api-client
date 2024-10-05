import { build, emptyDir } from "@deno/dnt";

await emptyDir("./npm");

const appConfig = JSON.parse(Deno.readTextFileSync("./deno.json"));

await build({
  entryPoints: ["./main.ts"],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  package: {
    name: appConfig.name,
    version: appConfig.version,
    description: "API client for Timbutler",
    license: appConfig.license,
    repository: {
      type: "git",
      url: "git+https://github.com/levma/timebutler-api-client.git",
    },
    bugs: {
      url: "https://github.com/levma/timebutler-api-client/issues",
    },
  },
  importMap: "./deno.json",
  test: false,
  filterDiagnostic() {
    return false;
  },

  postBuild() {
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
