import { defineConfig } from "@t3m4/common";

export default function Home() {
  const test = defineConfig(
    { root: { mode: ["custom1", "custom2"], facets: { facet1: [] } } },
    {
      root: {
        mode: {
          strategy: "multi",
          default: "custom1",
          colorSchemes: { custom1: "dark", custom2: "light" },
        },
      },
    },
  );

  console.log(test);

  return <div>page</div>;
}
