import type { Facet_Schema } from "./facet";
import type { Mode_Schema } from "./mode";

export namespace Facets_Schema {
  export namespace Generic {
    export type Facet = Facet_Schema.Generic;
    export namespace Facet {
      export type Mono = Facet_Schema.Generic.Mono;
      export type Multi = Facet_Schema.Generic.Multi;
    }

    export type Mode = Mode_Schema.Generic;
    export namespace Mode {
      export type Mono = Mode_Schema.Generic.Mono;
      export type Multi = Mode_Schema.Generic.Multi;
      export type System = Mode_Schema.Generic.System;
    }
  }

  export namespace Suggested {
    export type Facet = Facet_Schema.Suggested;
    export namespace Facet {
      export type Mono = Facet_Schema.Suggested.Mono;
      export type Multi = Facet_Schema.Suggested.Multi;
    }

    export type Mode = Mode_Schema.Suggested;
    export namespace Mode {
      export type Mono = Mode_Schema.Suggested.Mono;
      export type Multi = Mode_Schema.Suggested.Multi;
      export type System = Mode_Schema.Suggested.System;
    }
  }

  export namespace Readonly {
    export type Facet = Facet_Schema.Readonly;
    export namespace Facet {
      export type Mono = Facet_Schema.Readonly.Mono;
      export type Multi = Facet_Schema.Readonly.Multi;
    }

    export type Mode = Mode_Schema.Readonly
    export namespace Mode {
      export type Mono = Mode_Schema.Readonly.Mono;
      export type Multi = Mode_Schema.Readonly.Multi;
      export type System = Mode_Schema.Readonly.System;
    }
  }

  export namespace Facet {
    export type Generic = Facet_Schema.Generic;
    export namespace Generic {
      export type Mono = Facet_Schema.Generic.Mono;
      export type Multi = Facet_Schema.Generic.Multi;
    }

    export type Suggested = Facet_Schema.Suggested;
    export namespace Suggested {
      export type Mono = Facet_Schema.Suggested.Mono;
      export type Multi = Facet_Schema.Suggested.Multi;
    }

    export type Readonly = Facet_Schema.Readonly
    export namespace Readonly {
      export type Mono = Facet_Schema.Readonly.Mono;
      export type Multi = Facet_Schema.Readonly.Multi;
    }
  }

  export namespace Mode {
    export type Generic = Mode_Schema.Generic;
    export namespace Generic {
      export type Mono = Mode_Schema.Generic.Mono;
      export type Multi = Mode_Schema.Generic.Multi;
      export type System = Mode_Schema.Generic.System;
    }

    export type Suggested = Mode_Schema.Suggested;
    export namespace Suggested {
      export type Mono = Mode_Schema.Suggested.Mono;
      export type Multi = Mode_Schema.Suggested.Multi;
      export type System = Mode_Schema.Suggested.System;
    }

    export type Readonly = Mode_Schema.Readonly
    export namespace Readonly {
      export type Mono = Mode_Schema.Readonly.Mono;
      export type Multi = Mode_Schema.Readonly.Multi;
      export type System = Mode_Schema.Readonly.System;
    }
  }
}
