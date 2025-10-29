import type { Mono_Signatures } from "./mono";
import type { Multi_Signatures } from "./multi";
import type { System_Signatures } from "./system";

export namespace Signatures {
  export type Generic = Generic.Mono | Generic.Multi | Generic.System;
  export namespace Generic {
    export type Mono = Mono_Signatures.Generic;
    export type Multi = Multi_Signatures.Generic;
    export type System = System_Signatures.Generic;
  }

  export type Suggested = Suggested.Mono | Suggested.System;
  export namespace Suggested {
    export type Mono = Mono_Signatures.Suggested;
    export type System = System_Signatures.Suggested;
  }

  export type Readonly = Readonly.Multi | Readonly.System;
  export namespace Readonly {
    export type Multi = Multi_Signatures.Readonly;
    export type System = System_Signatures.Readonly;
  }

  export namespace Mono {
    export type Generic = Mono_Signatures.Generic;
    export type Suggested = Mono_Signatures.Suggested;
  }

  export namespace Multi {
    export type Generic = Multi_Signatures.Generic;
    export type Readonly = Multi_Signatures.Readonly;
  }

  export namespace System {
    export type Generic = System_Signatures.Generic;
    export type Suggested = System_Signatures.Suggested;
    export type Readonly = System_Signatures.Readonly;
  }
}
