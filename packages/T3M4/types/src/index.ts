import type { Schema, State } from "./types";

const test = {
  island: {
    mode: ['custom']
  }
} as const satisfies Schema.Suggested
type test = State<typeof test>