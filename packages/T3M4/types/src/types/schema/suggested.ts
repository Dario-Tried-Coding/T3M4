import * as Island from "./island.js";

export type Suggested = {
  [island: string]: Island.Suggested;
};

export type { Suggested as Island } from "./island.js";
