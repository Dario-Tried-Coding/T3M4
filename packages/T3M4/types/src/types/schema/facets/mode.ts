import type { Signatures } from "../../signatures";

export namespace Mode_Schema {
  export type Generic = Generic.Mono | Generic.Multi | Generic.System;
  export namespace Generic {
    export type Mono = Signatures.Mono.Generic;
    export type Multi = Signatures.Multi.Generic;
    export type System = Signatures.System.Generic;
  }

  export type Suggested = Suggested.Mono | Suggested.Multi | Suggested.System;
  export namespace Suggested {
    export type Mono = Signatures.Mono.Suggested;
    export type Multi = Signatures.Multi.Generic
    export type System = Signatures.System.Suggested;
  }

  export type Readonly = Readonly.Mono | Readonly.Multi | Readonly.System;
  export namespace Readonly {
    export type Mono = Signatures.Mono.Generic;
    export type Multi = Signatures.Multi.Readonly;
    export type System = Signatures.System.Readonly;
  }
}
