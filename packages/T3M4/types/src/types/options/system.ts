import { MODES } from "../constants";
import { LinientAutoComplete } from "../utils";
import * as Mono from "./mono";
import * as Multi from "./multi";

export type Generic = {
  light: Mono.Generic;
  dark: Mono.Generic;
  system?: Mono.Generic;
  custom?: Multi.Generic;
};

export type Suggested = {
  light: LinientAutoComplete<MODES["light"]>;
  dark: LinientAutoComplete<MODES["dark"]>;
  system?: LinientAutoComplete<MODES["system"]>;
  custom?: Multi.Generic;
};
