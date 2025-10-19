import * as Mono from "./mono";
import * as Multi from "./multi";
import * as System from "./system";

export type Generic = Generic.Mono | Generic.Multi | Generic.System;
export namespace Generic {
  export type Mono = Mono.Generic;
  export type Multi = Multi.Generic;
  export type System = System.Generic;
}

export type Suggested = Suggested.Mono | Suggested.System;
export namespace Suggested {
  export type Mono = Mono.Suggested;
  export type System = System.Suggested;
}

export * as Mono from "./mono";
export * as Multi from "./multi";
export * as System from "./system";