import type { Signatures } from "../../signatures";

export namespace Facet_Schema {
  export type Generic = Generic.Mono | Generic.Multi;
  export namespace Generic {
    export type Mono = Signatures.Mono.Generic;
    export type Multi = Signatures.Multi.Generic;
  }

  export type Suggested = Suggested.Mono | Suggested.Multi;
  export namespace Suggested {
    export type Mono = Signatures.Mono.Suggested;
    export type Multi = Signatures.Multi.Generic
  }

  export type Readonly = Readonly.Mono | Readonly.Multi;
  export namespace Readonly {
    export type Mono = Signatures.Mono.Generic
    export type Multi = Signatures.Multi.Readonly
  }
}
