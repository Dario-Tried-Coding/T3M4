import { DEFAULT } from "../constants";
import { LinientAutoComplete } from "../utils";

export namespace Mono_Signatures {
  export type Generic = string;
  export type Suggested = LinientAutoComplete<DEFAULT>;
}
