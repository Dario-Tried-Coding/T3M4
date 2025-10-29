import { MODES } from "../constants";
import { LinientAutoComplete } from "../utils";
import type { Mono_Signatures } from "./mono";
import type { Multi_Signatures } from "./multi";

export namespace System_Signatures {
  export type Generic = {
    light: Mono_Signatures.Generic;
    dark: Mono_Signatures.Generic;
    system?: Mono_Signatures.Generic;
    custom?: Multi_Signatures.Generic;
  };

  export type Suggested = {
    light: LinientAutoComplete<MODES["light"]>;
    dark: LinientAutoComplete<MODES["dark"]>;
    system?: LinientAutoComplete<MODES["system"]>;
    custom?: Multi_Signatures.Generic;
  };

  export type Readonly = {
    readonly light: Mono_Signatures.Generic;
    readonly dark: Mono_Signatures.Generic;
    readonly system?: Mono_Signatures.Generic;
    readonly custom?: Multi_Signatures.Readonly;
  };
}
