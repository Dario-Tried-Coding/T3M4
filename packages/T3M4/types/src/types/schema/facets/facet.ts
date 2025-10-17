import { Mono, Multi } from "../../options";

export type Generic = Generic.Mono | Generic.Multi
export namespace Generic {
  export type Mono = Mono.Generic
  export type Multi = Multi.Generic
}

export type Suggested = Suggested.Mono
export namespace Suggested {
  export type Mono = Mono.Suggested
}

export { Mono, Multi } from "../../options"