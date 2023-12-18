import { defineConfig } from "orval";

export default defineConfig({
  "task-api": {
    input: "./task-api.yaml",
    output: {
      mode: "split",
      clean: true,
      client: "react-query",
      prettier: true,
      mock: true,
      schemas: "./src/api/__generated__/schemas",
      target: "./src/api/__generated__/task-api.ts",
      override: {
        mutator: {
          path: "src/api/mutator/custom-instance.ts",
          name: "customInstance",
        },
        operationName: (operation, _, verb) =>
          `${operation.operationId}${verb === "get" ? "Query" : "Mutation"}`,
        query: {
          useQuery: true,
        },
        mock: {
          baseUrl: "http://localhost:4010",
          useExamples: true,
        },
        useNamedParameters: true,
      },
    },
  },
});
