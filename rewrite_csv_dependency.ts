const fileContent = Deno.readTextFileSync("./utils/parse-csv.ts");

const replacedContent = fileContent.replace(
  /@std\/csv/g,
  "https://deno.land/std@0.224.0/csv/parse.ts",
);

Deno.writeTextFileSync("./utils/parse-csv.ts", replacedContent);
