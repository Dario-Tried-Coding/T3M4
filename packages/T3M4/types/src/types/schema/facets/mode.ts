import { Mono, Multi, System } from "../../options";

export type Generic = Generic.Mono | Generic.Multi | Generic.System;
export namespace Generic {
  export type Mono = Mono.Generic;
  export type Multi = Multi.Generic;
  export type System = System.Generic;
}

export type Suggested = Suggested.Mono | Suggested.Multi | Suggested.System;
export namespace Suggested {
  export type Mono = Mono.Suggested;
  export type Multi = Multi.Generic;
  export type System = System.Suggested;
}

export { Mono, Multi, System } from "../../options";